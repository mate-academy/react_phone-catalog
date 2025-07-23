type ProductsListTranslations = {
  sortByLabel: string;
  sortNewest: string;
  sortPrice: string;
  sortName: string;
  itemsOnPageLabel: string;
  allItemsLabel: string;
  modelsCount: (count: number) => string;
};

interface ProductsListDictionary {
  ua: ProductsListTranslations;
  en: ProductsListTranslations;
}

export const productsListDictionary: ProductsListDictionary = {
  en: {
    sortByLabel: 'Sort by',
    sortNewest: 'Newest',
    sortPrice: 'Price',
    sortName: 'Name',
    itemsOnPageLabel: 'Items on page',
    allItemsLabel: 'All',
    modelsCount: count => `${count} models`,
  },
  ua: {
    sortByLabel: 'Сортувати за',
    sortNewest: 'Нові',
    sortPrice: 'Ціна',
    sortName: 'Назва',
    itemsOnPageLabel: 'На сторінці',
    allItemsLabel: 'Всі',
    modelsCount: count => `${count} моделей`,
  },
};
