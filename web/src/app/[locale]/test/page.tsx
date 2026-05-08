import { getItems, getInfo } from '@bigfive-org/questions';
import { Survey } from './survey';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { TestLanguageSwitch } from './test-language-switch';
import { AgentPrompt } from './agent-prompt';

const questionLanguages = getInfo().languages;

interface Props {
  params: { locale: string };
}

export default function TestPage({
  params: { locale }
}: Props) {
  unstable_setRequestLocale(locale);
  const language = questionLanguages.some((l) => l.id === locale)
    ? locale
    : 'en';
  const questions = getItems(language);
  const t = useTranslations('test');
  return (
    <>
      <div className='flex'>
        <TestLanguageSwitch
          availableLanguages={questionLanguages}
          language={language}
        />
      </div>
      {locale === 'en' && <AgentPrompt />}
      <Survey
        questions={questions}
        nextText={t('next')}
        prevText={t('back')}
        resultsText={t('seeResults')}
        language={language}
      />
    </>
  );
}
