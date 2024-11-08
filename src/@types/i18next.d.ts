import 'i18next';

declare module 'i18next' {
  interface Resources {
    en: {
      translation: typeof import('@locales/en/en.json');
    };
    uk: {
      translation: typeof import('@locales/uk/uk.json');
    };
    fr: {
      translation: typeof import('@locales/fr/fr.json');
    };
  }
}
