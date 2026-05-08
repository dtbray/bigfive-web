import { title } from '@/components/primitives';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import NextLink from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className='text-center justify-center mt-10'>
        <h1 className={title()}>About</h1>
      </div>
      <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
        <p>
          Psychometric models have a wonderful stage presence. Put five traits
          in a table, add a few decimal places, and suddenly a person feels less
          like a chaotic weather system and more like a dashboard with
          quarterly reporting.
        </p>
        <br />
        <p>
          That authority can be useful. The Big Five is a serious,
          well-traveled personality framework, and this site uses Johnson&apos;s
          public-domain 120-item IPIP-NEO item set. But the output is still a
          self-report questionnaire summary, not a diagnosis, hiring oracle, or
          laminated permission slip from the Department of Who You Really Are.
        </p>
        <br />
        <p>
          The catch is that 120 questions take a while. Humans have jobs,
          snacks, tabs open, and only so much patience for deciding whether they
          &quot;often feel blue&quot; before lunch. So we are increasing test
          velocity with vibe coding: publish the questions as JSON, hand them to
          an agent that already knows your working style, and let it produce a
          defensible first pass while admitting uncertainty where it has no
          evidence.
        </p>
        <br />
        <p>
          Treat the result as a conversation starter. If the model says you are
          highly conscientious while your desk is conducting its own archaeology
          project, that is not a contradiction. It is a useful reminder that
          personality scores describe tendencies, contexts, and interpretations,
          not a legally binding description of your sock drawer.
        </p>
        <br />
        <p>
          If you have questions, read through the{' '}
          <NextLink href='/faq' className='underline'>
            FAQ
          </NextLink>{' '}
          first. If you can&apos;t find an answer there, contact us at
          thomas@braytel.net.
        </p>
      </div>
    </>
  );
}
