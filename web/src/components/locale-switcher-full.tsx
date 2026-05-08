'use client';

import { ChangeEvent } from 'react';
import { basePath, languages } from '../config/site';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    const nextPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
    window.location.href = `${basePath}/${nextLocale}${nextPath || '/'}`;
  }

  return (
    <select
      aria-label='Select language'
      className='h-10 rounded-md border border-default-200 bg-background px-3 text-sm'
      name='localeSelect'
      value={locale}
      onChange={onSelectChange}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
