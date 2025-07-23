type ShopByCategoryTexts = {
  title: string;
  phones: string;
  tablets: string;
  accessories: string;
  models: string;
};

interface ShopByCategoryTranslations {
  en: ShopByCategoryTexts;
  ua: ShopByCategoryTexts;
}

export const shopByCategoryDictionary: ShopByCategoryTranslations = {
  en: {
    title: 'Shop by category',
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    models: 'models',
  },
  ua: {
    title: 'Обери категорію',
    phones: 'Мобільні телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    models: 'моделей',
  },
};
