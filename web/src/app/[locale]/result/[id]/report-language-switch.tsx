'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent } from 'react';
import { Language } from '@bigfive-org/results';
import { useSearchParams } from 'next/navigation';

export const ReportLanguageSwitch = ({
  language,
  availableLanguages
}: {
  language: string;
  availableLanguages: Language[];
}) => {
  const searchParams = useSearchParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLanguage = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', selectedLanguage);
    window.location.search = params.toString();
  }

  return (
    <div className='w-30'>
      <Select
        defaultSelectedKeys={[language]}
        onChange={onSelectChange}
        aria-label='Select language'
        name='localeSelectSmall'
        className='w-48'
        size='sm'
        label='Report language'
      >
        {availableLanguages.map((lang) => (
          <SelectItem key={lang.id} value={lang.id} textValue={lang.text}>
            {lang.text}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
