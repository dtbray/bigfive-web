# bigfive-web

Static Next.js app for GitHub Pages.

Website for the five-factor model of personality based on Johnson's public-domain 120-item IPIP-NEO item set.

Items and interpretive text are gathered from [ipip.ori.org](http://ipip.ori.org).

Scores are raw self-report summaries for self-reflection. They are not clinical diagnoses, employment assessments, or demographically normed percentile scores.

The frontend is written in [nodejs](https://nodejs.org) using the
[Next.js](https://nextjs.org/) framework.

## Installation

Download and install [Node.js](https://nodejs.org), [git](https://git-scm.com/downloads), and [pnpm](https://pnpm.io/).

## Development

Install dependencies:

```sh
pnpm install
```

Run the development server:

```sh
pnpm dev
```

Build the static site:

```sh
pnpm build
```

## Linting

Run the linter

```sh
pnpm lint && pnpm format:fix
```

## License

Licensed under the [MIT license](../LICENSE).
