import Link from 'next/link';
import { GithubIcon, LinkedInIcon, Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';

interface FooterProps {
  footerLinks: {
    label: string;
    href: string;
  }[];
}

export default function Footer({ footerLinks }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className='container mx-auto max-w-7xl px-12 py-24'>
      <div className='mx-auto flex justify-between'>
        <div className='w-1/2'>
          <span className='text-center'>
            <Logo />
          </span>
        </div>
        <div className='flex w-1/2 justify-end gap-3'>
          <a
            href={siteConfig.links.github}
            aria-label='Github'
            target='_blank'
            rel='noreferrer'
          >
            <GithubIcon size={48} className='text-default-500' />
          </a>
          <a
            href={siteConfig.links.linkedIn}
            aria-label='LinkedIn'
            target='_blank'
            rel='noreferrer'
          >
            <LinkedInIcon size={48} className='text-default-500' />
          </a>
        </div>
      </div>

      <div className='mt-12 flex w-full justify-center'>
        <ul className='mt-3 flex text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          {footerLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className='me-4 hover:underline md:me-6'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-14 flex justify-center text-sm text-gray-500 sm:ml-4 sm:py-2 sm:pl-4'>
        © {year} — Thomas Bray
      </div>
    </footer>
  );
}
