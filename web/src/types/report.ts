import type { Language, Domain } from '@bigfive-org/results';

export type Report = {
  id: string;
  timestamp: string | number;
  availableLanguages: Language[];
  language: string;
  results: Domain[];
};
