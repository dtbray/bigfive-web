import { title } from '@/components/primitives';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Alert } from '@/components/alert';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ComparePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('getCompare');
  return (
    <div className='h-[calc(60vh)]'>
      <h1 className={title()}>{t('title')}</h1>
      <br />
      <br />
      <span className='mt-2'>{t('description1')}</span>
      <div className='mt-8'>
        <Alert title='Compare is paused for static hosting'>
          <p>
            The original comparison feature required server-side stored results.
            This GitHub Pages build stores results locally in your browser.
          </p>
        </Alert>
      </div>
    </div>
  );
}
