type AccessoriesPageTexts = {
  title: string;
  empty: string;
};

interface AccessoriesPageTranslations {
  en: AccessoriesPageTexts;
  ua: AccessoriesPageTexts;
}

export const accessoriesPageDictionary: AccessoriesPageTranslations = {
  en: {
    title: 'Accessories',
    empty: 'There are no accessories yet',
  },
  ua: {
    title: 'Аксесуари',
    empty: 'Поки що немає аксесуарів',
  },
};
