export const BASE_FINE = 847.5;
export const FINE_INCREMENT_PER_SECOND = 0.00003;
export const FINE_INTERVAL_MS = 1000;
export const REPORT_LIMIT = 5;
export const REPORT_COOLDOWN_MS = 2000;

export const REFERENCE_CODE = 'REF: NB-404-2019';
export const LIBRARY_TITLE = 'Codex — Library Services';

export const EXCUSES = [
  'The dog ate it. The page, not the book.',
  'Was going to return it but got really into chapter 3.',
  'Left it at a café in Paris. Very romantic.',
  'Still reading. It is a long page.',
  '"Page" is a broad concept. Philosophically.',
  'The page asked to stay. Who am I to say no.',
] as const;

export const STAMPS = [
  'OVERDUE',
  'FINAL NOTICE',
  'WE KNOW WHERE YOU LIVE',
] as const;
