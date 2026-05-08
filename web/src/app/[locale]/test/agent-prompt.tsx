import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Snippet } from '@nextui-org/snippet';

const agentPrompt = `Answer this Big Five test on my behalf, using what you know about me from your memories and our past conversations. For each question, choose one of: Very Inaccurate, Moderately Inaccurate, Neither Accurate Nor Inaccurate, Moderately Accurate, or Very Accurate.

Only answer from evidence you actually have about me. If you are unsure, choose Neither Accurate Nor Inaccurate. Do not flatter me, diagnose me, or optimize for a result. Be consistent, candid, and brief.

Return a numbered list in order, with only the selected answer text for each item.`;

const agentInstructions = [
  'Open this page: https://blog.thomas-bray.com/bigfive-web/en/test/',
  'Answer each visible question by selecting one of the radio options.',
  'On narrow screens the test advances after each answer. On wider screens, answer the visible questions, then press Next.',
  'When every question is answered, press See Results.'
];

export function AgentPrompt() {
  return (
    <Card className='my-6 border border-secondary/30 bg-secondary/10'>
      <CardHeader className='flex-col items-start gap-2'>
        <h2 className='text-xl font-semibold'>
          Want an agent to help answer?
        </h2>
        <p className='text-default-600'>
          Throw this prompt into your favorite agent and ask it to answer as it
          knows you based on its memories.
        </p>
      </CardHeader>
      <CardBody className='gap-4'>
        <Snippet
          hideSymbol
          className='w-full max-w-full text-left'
          classNames={{
            pre: 'whitespace-pre-wrap break-words overflow-visible',
            content: 'whitespace-pre-wrap break-words'
          }}
          codeString={agentPrompt}
        >
          {agentPrompt}
        </Snippet>
        <div className='rounded-medium border border-default-200 bg-background/60 p-4'>
          <h3 className='mb-2 text-base font-semibold'>
            How the agent should take the test
          </h3>
          <ol className='list-decimal space-y-2 pl-5 text-sm text-default-700'>
            {agentInstructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
      </CardBody>
    </Card>
  );
}
