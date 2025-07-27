type TabletPageTexts = {
  title: string;
  empty: string;
};

interface TabletPageTranslations {
  en: TabletPageTexts;
  ua: TabletPageTexts;
}

export const tabletPageDictionary: TabletPageTranslations = {
  en: {
    title: 'Tablets',
    empty: 'There are no tablets yet',
  },
  ua: {
    title: 'Планшети',
    empty: 'Поки що немає планшетів',
  },
};
