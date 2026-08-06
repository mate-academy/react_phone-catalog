import en from '../../../../public/api/en.json';
import uk from '../../../../public/api/uk.json';

const translations = {
  en,
  uk,
};

export const getTranslation = (language: 'en' | 'uk' = 'en') => {
  return translations[language] || translations.en;
};
