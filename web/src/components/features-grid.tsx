import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface Feature {
  title: string;
  icon: ReactNode;
  description?: string | TrustedHTML;
  href?: string;
  isExternal?: boolean;
}

interface FeaturesGridProps {
  features: Feature[];
  className?: string;
}

export const FeaturesGrid = ({ features, className }: FeaturesGridProps) => {
  return (
    <div className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4', className)}>
      {features.map((feat: Feature, index: number) => (
        <FeatureCard feat={feat} key={`${feat.title}_${index}`} />
      ))}
    </div>
  );
};

const FeatureCard = ({ feat }: { feat: Feature }) => {
  const content = (
    <article className='h-full rounded-lg border border-transparent bg-white/5 p-4 backdrop-blur-lg backdrop-saturate-[1.8] transition-colors hover:border-default-200 dark:bg-default-400/10'>
      <header className='flex items-center gap-2'>
        <div className='flex items-center justify-center rounded-full bg-secondary-100/80 p-2 text-pink-500'>
          {feat.icon}
        </div>
        <p className='text-base font-semibold'>{feat.title}</p>
        {feat.isExternal ? (
          <span className='text-xs uppercase tracking-wide text-default-500'>
            External
          </span>
        ) : null}
      </header>
      {feat.description ? (
        <p
          className='mt-3 text-base font-normal text-default-500'
          dangerouslySetInnerHTML={{ __html: feat.description }}
        />
      ) : null}
    </article>
  );

  if (!feat.href) {
    return content;
  }

  return (
    <a
      className='block h-full text-foreground'
      href={feat.href}
      rel={feat.isExternal ? 'noreferrer' : undefined}
      target={feat.isExternal ? '_blank' : undefined}
    >
      {content}
    </a>
  );
};
