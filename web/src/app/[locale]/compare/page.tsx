import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Alert } from '@/components/alert';

interface Props {
  params: { locale: string };
}

export default function ComparePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('getCompare');
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
