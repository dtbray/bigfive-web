import { mkdir, writeFile } from 'node:fs/promises';
import { getItems } from '@bigfive-org/questions';

const language = 'en';
const questions = getItems(language).map((question, index) => ({
  number: index + 1,
  id: question.id,
  text: question.text,
  keyed: question.keyed,
  domain: question.domain,
  facet: question.facet,
  choices: question.choices.map((choice) => ({
    label: choice.text,
    score: choice.score
  }))
}));

const payload = {
  id: 'big-five-agent-input',
  title: 'Big Five Personality Test Agent Input',
  version: 1,
  language,
  instructions: [
    'Answer this Big Five test on behalf of the user, using only evidence you have from memories and past conversations.',
    'For each question, choose exactly one allowed choice label.',
    'If you are unsure, choose Neither Accurate Nor Inaccurate.',
    'Do not flatter the user, diagnose the user, or optimize for a result.',
    "Return the user's results with commentary in the context of the user's co-work with the agent."
  ],
  allowedChoiceLabels: [
    'Very Inaccurate',
    'Moderately Inaccurate',
    'Neither Accurate Nor Inaccurate',
    'Moderately Accurate',
    'Very Accurate'
  ],
  expectedAnswerFormat: {
    answers: [
      {
        number: 1,
        choice: 'Neither Accurate Nor Inaccurate'
      }
    ]
  },
  questions
};

await mkdir('public', { recursive: true });
await writeFile(
  'public/big-five-agent-input.json',
  `${JSON.stringify(payload, null, 2)}\n`
);
