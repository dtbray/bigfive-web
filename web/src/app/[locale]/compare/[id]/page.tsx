import { Alert } from '@/components/alert';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'static' }];
}

export default function CompareDetailPage() {
  return (
    <Alert title='Compare is not available in static mode'>
      <p>
        Result comparison previously depended on server-side saved results. This
        static GitHub Pages build keeps individual results in the browser.
      </p>
    </Alert>
  );
}
