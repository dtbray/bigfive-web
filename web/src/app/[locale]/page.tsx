import { title, subtitle } from '@/components/primitives';
import { FeaturesGrid } from '@/components/features-grid';
import {
  ExperimentIcon,
  GithubIcon,
  LanguageIcon,
  LogosOpensource,
  MoneyIcon,
  PlusLinearIcon
} from '@/components/icons';
import { ArrowRightIcon } from '@/components/icons';
import { basePath, siteConfig } from '@/config/site';
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { PostCard } from '@/components/post-card';
import { SonarPulse } from '@/components/sonar-pulse';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import NextLink from 'next/link';
import { Translated } from '@/components/translated';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('frontpage');
  const f = await getTranslations('facets');
  const testPath = `${basePath}/${locale}/test/`;
  const articlesPath = `${basePath}/${locale}/articles/`;

  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

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

      <div className='mt-20 text-center'>
        <h1 className={title()}>{t('compare.title')}</h1>

        <div className='mt-10'>
          <div className='text-lg lg:text-xl font-normal text-default-500'>
            {t('compare.text1')} {t('compare.text2')}
          </div>
        </div>
      </div>

      <div className='text-center h-64 md:h-80 mt-44 md:mt-56'>
        <SonarPulse
          color='#7928CA'
          icon={
            <a
              aria-label={t('call_to_action')}
              className='z-50 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-b from-[#FF1CF7] to-[#7928CA]'
              href={testPath}
            >
              <PlusLinearIcon
                className='flex items-center justify-center rounded-full text-white'
                size={54}
              />
            </a>
          }
        >
          <div
            className='absolute rounded-full'
            style={{
              width: '130px',
              top: 130 / 6,
              left: -120
            }}
          >
            {buildCircle([
              {
                name: f('openness_to_experience.title'),
                href: '/articles/openness_to_experience'
              },
              {
                name: f('conscientiousness.title'),
                href: '/articles/conscientiousness'
              },
              { name: f('extraversion.title'), href: '/articles/extraversion' },
              {
                name: t('compare.action'),
                href: '/compare/W3sibmFtZSI6Ik1hcnZpbiIsImlkIjoiNThhNzA2MDZhODM1YzQwMGM4YjM4ZTg0In0seyJuYW1lIjoiQXJ0aHVyIERlbnQiLCJpZCI6IjVlNTZiYTdhYjA5NjEzMDAwN2Q1ZDZkOCJ9LHsibmFtZSI6IkZvcmQgUGVyZmVjdCIsImlkIjoiNWRlYTllODhlMTA4Y2IwMDYyMTgzYWYzIn0seyJuYW1lIjoiU2xhcnRpYmFydGZhc3QiLCJpZCI6IjVlNTZiNjUwYjA5NjEzMDAwN2Q1ZDZkMCJ9XQ'
              },
              {
                name: f('agreeableness.title'),
                href: '/articles/agreeableness'
              },
              { name: f('neuroticism.title'), href: '/articles/neuroticism' }
            ]).map((e, idx) => (
              <div key={idx}>
                <NextLink
                  key={idx}
                  style={e.style}
                  className='absolute hidden rounded-full border border-default-300 px-4 py-2 text-sm hover:bg-secondary md:inline-flex'
                  href={e.href}
                  aria-label={e.name}
                >
                  {e.name}
                </NextLink>
                <NextLink
                  aria-label={e.name}
                  className='absolute left-[85px] w-36 rounded-full bg-secondary px-3 py-1 text-center text-xs text-white shadow-black drop-shadow md:hidden'
                  style={e.smallStyle}
                  href={e.href}
                >
                  {e.name}
                </NextLink>
              </div>
            ))}
          </div>
        </SonarPulse>
      </div>

      <div className='text-center mx-2'>
        <NextLink href={articlesPath} className='text-foreground'>
          <h1 className={title()}>Latest posts</h1>
        </NextLink>
        <h2 className={subtitle({ class: 'mt-4' })}>
          All the latest and greatest news and articles on #personality
        </h2>
        <div className='mt-10 grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
        <div className='mt-10'>
          <NextLink
            className='mb-8 -ml-3 block text-lg text-default-500 hover:text-default-900'
            href={articlesPath}
          >
            Show all articles ...
          </NextLink>
        </div>
      </div>

      <Translated />
    </section>
  );
}
const buildCircle = (list: { name: string; href: string }[]) => {
  const num = list.length; // Number of Avatars
  const radius = 180; // Distance from center
  const start = -90; // Shift start from 0
  const slice = 360 / num;

  return list.map((item, idx) => {
    const rotate = slice * idx + start;
    return {
      name: item.name,
      href: item.href,
      style: {
        transform: `rotate(${rotate}deg) translate(${radius - 20}px) rotate(${-rotate}deg)`,
        width: '195px'
      },
      smallStyle: {
        transform: `rotate(${rotate}deg) translate(${radius - 60}px) rotate(${-rotate}deg)`
      }
    };
  });
};
