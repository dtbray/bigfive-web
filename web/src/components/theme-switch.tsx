'use client';

import { useTheme } from 'next-themes';
import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type='button'
      className='flex h-10 w-10 items-center justify-center rounded-md text-default-500 hover:text-foreground'
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {isLight ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
    </button>
  );
}
