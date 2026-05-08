import { getItems } from '@bigfive-org/questions';
import { Survey } from './survey';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AgentPrompt } from './agent-prompt';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function TestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const language = 'en';
  const questions = getItems(language);
  const t = await getTranslations('test');
  return (
    <>
      {locale === 'en' && <AgentPrompt />}
      <Survey
        questions={questions}
        nextText={t('next')}
        prevText={t('back')}
        resultsText={t('seeResults')}
        language={language}
        locale={locale}
      />
    </>
  );
}
