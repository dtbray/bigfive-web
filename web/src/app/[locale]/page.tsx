import { title, subtitle } from '@/components/primitives';
import { FeaturesGrid } from '@/components/features-grid';
import {
  ExperimentIcon,
  GithubIcon,
  LanguageIcon,
  LogosOpensource,
  MoneyIcon
} from '@/components/icons';
import { ArrowRightIcon } from '@/components/icons';
import { basePath, siteConfig } from '@/config/site';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Translated } from '@/components/translated';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('frontpage');
  const testPath = `${basePath}/${locale}/test/`;

  const features = [
    {
      title: t('cards.open.title'),
      description: t('cards.open.text'),
      icon: LogosOpensource({})
    },
    {
      title: t('cards.free.title'),
      description: t('cards.free.text'),
      icon: MoneyIcon({})
    },
    {
      title: t('cards.scientific.title'),
      description: t('cards.scientific.text'),
      icon: ExperimentIcon({})
    },
    {
      title: t('cards.translated.title'),
      description: t.raw('cards.translated.text'),
      icon: LanguageIcon({}),
      href: 'https://b5.translations.alheimsins.net/'
    }
  ];

  const titleDescription = t.rich('description.top', {
    violet: (chunks) => (
      <span className={title({ color: 'violet' })}>{chunks}</span>
    )
  });

  const testsTaken = t.rich('tests_taken', {
    green: (chunks) => (
      <span className={title({ color: 'green' })}>{chunks}</span>
    ),
    n: '4.000.000'
  });

  return (
    <section className='relative'>
      <div>
        <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
          <div className='flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10'>
            <div className='text-center justify-center mt-10'>
              <h1 className={title()}>{titleDescription}</h1>
              <br />
              <h2 className={subtitle({ class: 'mt-4' })}>
                {t('description.info')}
              </h2>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-4 justify-center'>
              <a
                href={testPath}
                className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition-opacity hover:opacity-90 md:w-auto'
              >
                {t('call_to_action')} <ArrowRightIcon />
              </a>
              <a
                className='inline-flex w-full items-center justify-center gap-2 rounded-full border border-default-300 px-6 py-3 text-base font-medium transition-colors hover:bg-default-100 md:w-auto'
                href={siteConfig.links.github}
                target='_blank'
                rel='noreferrer'
              >
                <GithubIcon size={20} />
                GitHub
              </a>
            </div>
          </div>

          <div className='font-normal text-default-500 block max-w-full text-center underline'>
            {t('no_registration')}
          </div>
        </section>

        <div className='mt-20 mx-2'>
          <FeaturesGrid features={features} />
        </div>
      </div>

      <section className='border-t border-b border-divider px-8 mt-16 lg:mt-44 text-center'>
        <div className='my-8'>
          <h1 className={title()}>{testsTaken}</h1>
        </div>
      </section>

      <Translated />
    </section>
  );
}
