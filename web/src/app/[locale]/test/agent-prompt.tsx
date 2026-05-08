'use client';

import { CopyIcon } from '@/components/icons';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const agentPrompt = `Answer this Big Five test on my behalf, using what you know about me from your memories and our past conversations. For each question, choose one of: Very Inaccurate, Moderately Inaccurate, Neither Accurate Nor Inaccurate, Moderately Accurate, or Very Accurate.

Only answer from evidence you actually have about me. If you are unsure, choose Neither Accurate Nor Inaccurate. Do not flatter me, diagnose me, or optimize for a result. Be consistent, candid, and brief.

Return a numbered list in order, with only the selected answer text for each item. After the test results are generated, return the results with some commentary about them in the context of the user's co-work with the agent.`;

const agentInstructions = [
  'Open this page: https://blog.thomas-bray.com/bigfive-web/en/test/',
  'Answer each visible question by selecting one of the radio options.',
  'On narrow screens the test advances after each answer. On wider screens, answer the visible questions, then press Next.',
  'When every question is answered, press See Results.'
];

export function AgentPrompt() {
  const [copiedText, copy] = useCopyToClipboard();
  const copied = copiedText === agentPrompt;

  return (
    <section className='my-6 rounded-lg border border-secondary/30 bg-secondary/10 p-4'>
      <div className='flex flex-col gap-4'>
        <header className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold'>
              Want an agent to help answer?
            </h2>
            <p className='text-default-600'>
              Throw this prompt into your favorite agent and ask it to answer as
              it knows you based on its memories.
            </p>
          </div>
          <button
            aria-label='Copy agent prompt'
            className='inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-default-300 bg-background/70 px-3 py-2 text-sm font-medium text-default-700 transition-colors hover:bg-default-100'
            onClick={() => copy(agentPrompt)}
            type='button'
          >
            <CopyIcon size={18} />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </header>

        <div className='rounded-lg border border-default-200 bg-background/80 p-4'>
          <pre
            className='w-full max-w-full whitespace-pre-wrap break-words text-left text-sm leading-6 text-default-700'
            tabIndex={0}
          >
            {agentPrompt}
          </pre>
        </div>

        <div>
          <h3 className='mb-2 text-base font-semibold'>
            How the agent should take the test
          </h3>
          <ol className='list-decimal space-y-2 pl-5 text-sm text-default-700'>
            {agentInstructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
