'use client';

import LocaleSwitcher from '@/components/locale-switcher';
import LocaleSwitcherFull from '@/components/locale-switcher-full';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';
import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, Logo } from '@/components/icons';
import NextLink from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  navItems: { label: string; href: string }[];
  navMenuItems: { label: string; href: string }[];
  locale: string;
}

export const Navbar = ({ navItems, navMenuItems, locale }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCurrentPath = (link: string): boolean => {
    if (link === '/') return pathname === '/' || pathname === `/${locale}`;
    return pathname.includes(link);
  };

  const linkClass = (href: string) =>
    clsx(
      'text-sm text-foreground/80 hover:text-foreground',
      'data-[active=true]:text-danger data-[active=true]:font-medium'
    );

  return (
    <nav className='sticky top-0 z-50 border-b border-default-200 bg-background/90 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <div className='flex items-center gap-6'>
          <NextLink
            className='flex items-center gap-1'
            href='/'
            aria-label='Home'
          >
            <Logo />
          </NextLink>
          <div className='hidden items-center gap-4 md:flex'>
            {navItems.map((item) => (
              <NextLink
                key={item.href}
                data-active={isCurrentPath(item.href)}
                className={linkClass(item.href)}
                href={item.href}
              >
                {item.label}
              </NextLink>
            ))}
          </div>
        </div>

        <div className='hidden items-center gap-4 md:flex'>
          <a
            href={siteConfig.links.github}
            aria-label='Github'
            target='_blank'
            rel='noreferrer'
          >
            <GithubIcon className='text-default-500' />
          </a>
          <ThemeSwitch />
          <LocaleSwitcherFull locale={locale} />
        </div>

        <div className='flex items-center gap-3 md:hidden'>
          <LocaleSwitcher locale={locale} />
          <a
            href={siteConfig.links.github}
            aria-label='Github'
            target='_blank'
            rel='noreferrer'
          >
            <GithubIcon className='text-default-500' />
          </a>
          <ThemeSwitch />
          <button
            type='button'
            className='flex h-10 w-10 items-center justify-center rounded-md border border-default-200'
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden='true'>{isMenuOpen ? 'x' : '='}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='border-t border-default-200 px-6 py-4 md:hidden'>
          <div className='flex flex-col gap-4'>
            {navMenuItems.map((item) => (
              <NextLink
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
                href={item.href}
                data-active={isCurrentPath(item.href)}
                className={clsx(linkClass(item.href), '!text-2xl')}
              >
                {item.label}
              </NextLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
