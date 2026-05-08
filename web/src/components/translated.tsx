import { title } from '@/components/primitives';
import { languages, Language } from '@/config/site';

export const Translated = () => {
  const CountryAvatar = ({ lang }: { lang: Language }) =>
    lang.countryCode ? (
      <img
        alt={lang.name}
        className='h-12 w-12 rounded-full object-cover'
        aria-label={lang.name}
        src={`/flags/${lang.countryCode}.svg`}
      />
    ) : (
      <span
        aria-label={lang.name}
        className='flex h-12 w-12 items-center justify-center rounded-full bg-default-200 text-sm font-semibold text-default-700'
      >
        {lang.code.toUpperCase()}
      </span>
    );
  return (
    <section className='border-t border-b border-divider px-8 mt-10 text-center'>
      <div className='my-8'>
        <h3 className={title()}>Translated in multiple languages</h3>
        <div
          x-data='{}'
          x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
          className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'
        >
          <ul
            x-ref='logos'
            className='flex gap-x-2 mt-8 items-center justify-center md:justify-start [&_li]:mx-8 [&_span]:max-w-none animate-infinite-scroll'
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <CountryAvatar lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
