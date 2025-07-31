type PhonesPageTexts = {
  title: string;
  empty: string;
};

interface PhonesPageTranslations {
  en: PhonesPageTexts;
  ua: PhonesPageTexts;
}

export const phonePageDictionary: PhonesPageTranslations = {
  en: {
    title: 'Mobile phones',
    empty: 'There are no phones yet',
  },
  ua: {
    title: 'Мобільні телефони',
    empty: 'Поки що немає телефонів',
  },
};
