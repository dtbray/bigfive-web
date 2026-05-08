import { HeartBoldIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Feedback from './feedback';
import { Link } from '@/navigation';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

export default function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className='text-center justify-center mt-10'>
        <h1 className={title()}>About</h1>
      </div>
      <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
        <p>
          This project is an open-source Big Five self-report questionnaire
          based on Johnson&apos;s public-domain 120-item IPIP-NEO item set. It
          summarizes Openness, Conscientiousness, Extraversion, Agreeableness,
          and Neuroticism.
        </p>
        <br />
        <p>
          Results are useful for personal reflection and informal comparison,
          but they are raw questionnaire summaries. They should not be treated
          as a diagnosis, hiring screen, clinical assessment, or a substitute
          for a professionally administered, normed instrument.
        </p>
        <p>
          The Big Five model remains a mainstream personality framework, while
          current research also emphasizes measurement uncertainty, cultural and
          language differences, and careful interpretation of facet scores.
        </p>
        <br />
        <p>
          If you have questions please read through the{' '}
          <Link href='/faq' className='underline'>
            FAQ
          </Link>{' '}
          first. If you can&apos;t find an answer there, feel free to contact us
          at thomas@braytel.net.
        </p>
      </div>
      <section>
        <div className='text-center justify-center mt-20'>
          <h2 className={title()}>We love feedback!&nbsp;</h2>
          <div className='flex md:inline-flex flex-col md:flex-row items-center'>
            <HeartBoldIcon
              className='text-pink-500 animate-heartbeat'
              size={50}
              style={{
                animationDuration: '2.5s'
              }}
            />
          </div>
          <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
            Send us feedback about how our features can be improved or specific
            issues.
          </div>
        </div>
        <Feedback />
      </section>
    </>
  );
}
