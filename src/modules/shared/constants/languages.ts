export interface Language {
  code: string;
  locale: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  {
    code: 'en',
    locale: 'en',
    name: 'english',
    flag: './img/flags/united-kingdom.png',
  },
  {
    code: 'uk',
    locale: 'ua',
    name: 'ukrainian',
    flag: './img/flags/ukraine.png',
  },
  {
    code: 'pl',
    locale: 'pl',
    name: 'polish',
    flag: './img/flags/poland.png',
  },
];
