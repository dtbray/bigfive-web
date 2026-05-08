'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent } from 'react';
import { Language } from '@bigfive-org/questions';
import { basePath } from '@/config/site';

interface TestLanguageSwitchProps {
  availableLanguages: Language[];
  language: string;
}

export const TestLanguageSwitch = ({
  availableLanguages,
  language
}: TestLanguageSwitchProps) => {
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLanguage = event.target.value;
    window.location.href = `${basePath}/${selectedLanguage}/test/`;
  }

  return (
    <div className='w-30'>
      <Select
        defaultSelectedKeys={[language]}
        onChange={onSelectChange}
        aria-label='Select survey language'
        size='sm'
        name='localeSelectSmall'
        className='w-48'
        label='Survey language'
        items={availableLanguages}
      >
        {(language) => (
          <SelectItem key={language.id} value={language.id}>
            {language.text}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};
