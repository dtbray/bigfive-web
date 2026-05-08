'use client';

import { button as buttonStyles } from '@nextui-org/theme';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Button } from '@nextui-org/button';
import { useRouter } from '@/navigation';
import { formatAndValidateId, formatId } from '@/lib/helpers';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@nextui-org/input';
import { ResultIcon } from '@/components/icons';
import { getItems } from '@bigfive-org/questions';
import { basePath } from '@/config/site';
import type { Answer } from '@/types';

interface GetResultPageProps {
  viewPreviousText: string;
  getResultsText: string;
}

type AgentAnswer = {
  number: number;
  choice: string;
};

type AgentResultPayload = {
  answers?: AgentAnswer[];
};

const questions = getItems('en');

export const GetResultPage = ({
  viewPreviousText,
  getResultsText
}: GetResultPageProps) => {
  const router = useRouter();

  const [previousResultId, setPreviousResultId] = useState<string | null>(null);
  const [id, setId] = useState('');
  const [agentJson, setAgentJson] = useState('');
  const [agentJsonError, setAgentJsonError] = useState('');

  const isInvalidId = useMemo(() => {
    if (id === '') return false;

    return !formatAndValidateId(id);
  }, [id]);

  useEffect(() => {
    const resultId = localStorage.getItem('resultId');
    if (resultId) {
      setPreviousResultId(resultId);
    }
  }, []);

  const handleGetResults = () => {
    if (!formatAndValidateId(id)) return;
    router.push(`/result?id=${formatId(id)}`);
  };

  const handleImportAgentJson = () => {
    setAgentJsonError('');

    let parsed: AgentResultPayload;
    try {
      parsed = JSON.parse(agentJson);
    } catch {
      setAgentJsonError('That does not look like valid JSON.');
      return;
    }

    if (!Array.isArray(parsed.answers)) {
      setAgentJsonError('Expected JSON with an answers array.');
      return;
    }

    if (parsed.answers.length !== questions.length) {
      setAgentJsonError(`Expected ${questions.length} answers.`);
      return;
    }

    const answers: Answer[] = [];

    for (const answer of parsed.answers) {
      const question = questions[answer.number - 1];
      if (!question) {
        setAgentJsonError(`Question ${answer.number} is out of range.`);
        return;
      }

      const choice = question.choices.find((c) => c.text === answer.choice);
      if (!choice) {
        setAgentJsonError(
          `Question ${answer.number} has an invalid choice: ${answer.choice}`
        );
        return;
      }

      answers.push({
        id: question.id,
        score: choice.score,
        domain: question.domain,
        facet: question.facet
      });
    }

    const resultId = generateLocalResultId();
    const storedResults = JSON.parse(localStorage.getItem('b5results') || '{}');
    localStorage.setItem(
      'b5results',
      JSON.stringify({
        ...storedResults,
        [resultId]: {
          testId: 'b5-120',
          lang: 'en',
          invalid: false,
          timeElapsed: 0,
          dateStamp: new Date().toISOString(),
          answers
        }
      })
    );
    localStorage.setItem('resultId', resultId);
    window.location.href = `${basePath}/en/result?id=${resultId}`;
  };

  function generateLocalResultId() {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  return (
    <>
      <div className='w-full my-3'>
        <Input
          type='text'
          label='ID'
          labelPlacement='outside'
          placeholder='58a70606a835c400c8b38e84'
          startContent={
            <ResultIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
          }
          isInvalid={isInvalidId}
          color={isInvalidId ? 'danger' : 'default'}
          onValueChange={setId}
          errorMessage={isInvalidId && 'Please enter a valid ID'}
          value={id}
        />
      </div>
      <div className='flex justify-end gap-3'>
        {previousResultId && (
          <Link
            className={clsx(
              buttonStyles({ color: 'danger', size: 'lg' }),
              'w-full md:w-auto'
            )}
            href={`/result?id=${previousResultId}`}
          >
            {viewPreviousText}
          </Link>
        )}
        <Button
          color='primary'
          size='lg'
          className='w-full md:w-auto'
          onClick={handleGetResults}
          isDisabled={id === '' || isInvalidId}
        >
          {getResultsText}
        </Button>
      </div>
      <div className='mt-10 rounded-lg border border-default-200 bg-background/60 p-4'>
        <h2 className='text-xl font-semibold'>Import agent answers</h2>
        <p className='mt-2 text-sm text-default-600'>
          Paste the JSON returned by an agent using the machine-readable test
          input. The answers stay in this browser and open as a normal result.
        </p>
        <textarea
          aria-label='Agent answer JSON'
          className='mt-4 min-h-56 w-full rounded-md border border-default-200 bg-background p-3 font-mono text-sm text-default-700'
          onChange={(event) => setAgentJson(event.target.value)}
          placeholder='{"answers":[{"number":1,"choice":"Neither Accurate Nor Inaccurate"}]}'
          value={agentJson}
        />
        {agentJsonError ? (
          <p className='mt-2 text-sm text-danger'>{agentJsonError}</p>
        ) : null}
        <div className='mt-4 flex justify-end'>
          <Button
            color='secondary'
            onClick={handleImportAgentJson}
            isDisabled={!agentJson.trim()}
          >
            Import and view result
          </Button>
        </div>
      </div>
    </>
  );
};
