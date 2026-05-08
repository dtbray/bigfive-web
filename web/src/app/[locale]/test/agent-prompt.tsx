import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Snippet } from '@nextui-org/snippet';

const agentPrompt = `Answer this Big Five test on my behalf, using what you know about me from your memories and our past conversations. For each question, choose one of: Very Inaccurate, Moderately Inaccurate, Neither Accurate Nor Inaccurate, Moderately Accurate, or Very Accurate.

Only answer from evidence you actually have about me. If you are unsure, choose Neither Accurate Nor Inaccurate. Do not flatter me, diagnose me, or optimize for a result. Be consistent, candid, and brief.

Return a numbered list in order, with only the selected answer text for each item.`;

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
      <CardBody>
        <Snippet
          hideSymbol
          className='w-full whitespace-pre-wrap text-left'
          codeString={agentPrompt}
        >
          {agentPrompt}
        </Snippet>
      </CardBody>
    </Card>
  );
}
