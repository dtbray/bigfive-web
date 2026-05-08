# bigfive-web

Fork target: GitHub Pages

Website for the five-factor model of personality based on Johnson's public-domain 120-item IPIP-NEO item set.

Items and interpretive text are gathered from [ipip.ori.org](http://ipip.ori.org).

This fork is being updated for static hosting and current-day psychometric framing. Scores are raw self-report summaries for self-reflection; they are not clinical diagnoses, employment assessments, or demographically normed percentile scores.

## Static hosting

The Next.js app in `web/` is configured for `output: 'export'` so it can be deployed to GitHub Pages. Results are stored locally in the browser instead of MongoDB.

```sh
cd web
pnpm install
pnpm build
```

## Help wanted

If you want to help by translating the items to other languages look [here](https://b5.translations.alheimsins.net/).

## License

[MIT](LICENSE)
