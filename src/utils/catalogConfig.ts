export const catalogConfig = {
  Phones: {
    title: 'Mobile phones',
    count: '95',
    category: 'phones',
    apiCatalog: 'products.json',
    apiProduct: 'phones.json',
  },
  Tablets: {
    title: 'Tablets',
    count: '24',
    category: 'tablets',
    apiCatalog: 'products.json',
    apiProduct: 'tablets.json',
  },
  Accessories: {
    title: 'Accessories',
    count: '100',
    category: 'accessories',
    apiCatalog: 'products.json',
    apiProduct: 'accessories.json',
  },
};

export type CatalogType = keyof typeof catalogConfig;
