import { Alert } from '@/components/alert';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'static' }];
}

export default function LegacyResultPage() {
  return (
    <Alert title='Result links changed in static mode'>
      <p>
        Static GitHub Pages results are stored in your browser and opened from
        the <a href='/result/'>result lookup page</a>.
      </p>
    </Alert>
  );
}
