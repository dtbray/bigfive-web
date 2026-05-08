import { mkdir, writeFile } from 'node:fs/promises';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const target = `${basePath}/en/`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="${target}">
    <title>Big Five Personality Test</title>
  </head>
  <body>
    <p><a href="${target}">Continue to the Big Five Personality Test</a></p>
  </body>
</html>
`;

await mkdir('out', { recursive: true });
await writeFile('out/index.html', html);
