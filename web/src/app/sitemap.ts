import { MetadataRoute } from 'next';
import { basePath, locales } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const alternatesPageLang = (path: string = '') =>
    locales.reduce((a, v) => ({ ...a, [v]: basePath + `/${v}${path}` }), {});

  return [
    {
      url: basePath,
      lastModified: new Date(),
      alternates: {
        languages: alternatesPageLang()
      }
    },
    {
      url: basePath,
      lastModified: new Date(),
      alternates: {
        languages: alternatesPageLang('/result')
      }
    },
    {
      url: `${basePath}/test`,
      lastModified: new Date()
      // add lang
    },
    {
      url: `${basePath}/about`,
      lastModified: new Date()
    },
    {
      url: `${basePath}/faq`,
      lastModified: new Date()
    },
    {
      url: `${basePath}/privacy`,
      lastModified: new Date()
    },
    {
      url: `${basePath}/big-five-agent-input.json`,
      lastModified: new Date()
    }
  ];
}
