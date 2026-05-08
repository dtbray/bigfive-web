'use client';

import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResultsClient } from './results-client';

export function ResultPageClient({ fallback }: { fallback: ReactNode }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) return <>{fallback}</>;

  return (
    <ResultsClient
      id={id.substring(0, 24)}
      language={searchParams.get('lang') || undefined}
      showExpanded={searchParams.get('showExpanded') === 'true'}
    />
  );
}
