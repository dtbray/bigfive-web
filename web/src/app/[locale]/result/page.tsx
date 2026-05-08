import { title } from '@/components/primitives';
import { GetResultPage } from './get-result';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResultPageClient } from './result-page-client';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('getResult');
  const results = await getTranslations('results');

  return (
    <Suspense>
      <ResultPageClient
        labels={{
          important: results('important'),
          saveResults: results('saveResults'),
          theBigFive: results('theBigFive'),
          score: results('score')
        }}
        fallback={
          <div className='h-[calc(60vh)]'>
            <h1 className={title()}>{t('result')}</h1>
            <div className='mt-10'>{t('explanation')}</div>
            <GetResultPage
              viewPreviousText={t('viewPrevious')}
              getResultsText={t('getResult')}
            />
          </div>
        }
      />
    </Suspense>
  );
}
