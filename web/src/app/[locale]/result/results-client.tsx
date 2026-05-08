'use client';

import { useEffect, useMemo, useState } from 'react';
import { Snippet } from '@nextui-org/snippet';
import { Chip } from '@nextui-org/react';
import calculateScore from '@bigfive-org/score';
import generateResult, { getInfo } from '@bigfive-org/results';

import { Alert } from '@/components/alert';
import { BarChart } from '@/components/bar-chart';
import ShareBar from '@/components/share-bar';
import { title } from '@/components/primitives';
import { supportEmail } from '@/config/site';
import type { DbResult } from '@/types';
import type { Report } from '@/types/report';
import { DomainTabs } from './[id]/domain-tabs';
import { ReportLanguageSwitch } from './[id]/report-language-switch';

type ResultsClientProps = {
  id?: string;
  language?: string;
  showExpanded?: boolean;
  labels: {
    important: string;
    saveResults: string;
    theBigFive: string;
    score: string;
  };
};

const resultLanguages = getInfo().languages;

export function ResultsClient({
  id,
  language,
  showExpanded,
  labels
}: ResultsClientProps) {
  const [storedResult, setStoredResult] = useState<DbResult | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!id) {
      setStoredResult(null);
      return;
    }
    const storedResults = JSON.parse(localStorage.getItem('b5results') || '{}');
    setStoredResult(storedResults[id] || null);
  }, [id]);

  const report = useMemo<Report | null>(() => {
    if (!id || !storedResult) return null;
    const selectedLanguage =
      language ||
      (resultLanguages.some((l) => l.id === storedResult.lang)
        ? storedResult.lang
        : 'en');
    const scores = calculateScore({ answers: storedResult.answers as any });
    return {
      id,
      timestamp: storedResult.dateStamp,
      availableLanguages: resultLanguages,
      language: selectedLanguage,
      results: generateResult({ lang: selectedLanguage, scores })
    };
  }, [id, language, storedResult]);

  if (storedResult === undefined) return null;

  if (!report) {
    return (
      <Alert title='Could not retrieve report'>
        <>
          <p>We could not retrieve the result ID {id || '(missing)'}.</p>
          <p>
            Results are stored locally in this browser. Check the ID or contact
            us at {supportEmail}.
          </p>
        </>
      </Alert>
    );
  }

  return (
    <>
      <div className='flex'>
        <div className='flex-grow'>
          <ReportLanguageSwitch
            language={report.language}
            availableLanguages={report.availableLanguages}
          />
        </div>
        <Chip>{new Date(report.timestamp).toLocaleDateString()}</Chip>
      </div>
      <div className='text-center mt-4'>
        <span className='font-bold'>{labels.important}</span> &nbsp;
        {labels.saveResults}
      </div>
      <div className='flex mt-4'>
        <Snippet
          hideSymbol
          color='danger'
          className='w-full justify-center'
          size='lg'
        >
          {report.id}
        </Snippet>
      </div>
      <div className='flex mt-5 justify-end w-full gap-x-1 print:hidden'>
        <ShareBar report={report} />
      </div>
      <div className='flex mt-10'>
        <h1 className={title()}>{labels.theBigFive}</h1>
      </div>
      <BarChart max={120} results={report.results} />
      <DomainTabs
        results={report.results}
        showExpanded={!!showExpanded}
        scoreText={labels.score}
      />
    </>
  );
}
