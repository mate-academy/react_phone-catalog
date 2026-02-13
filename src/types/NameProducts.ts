export type NameProducts = 'phones' | 'tablets' | 'accessories' | 'allProducts';

export type NameCategory = Exclude<NameProducts, 'allProducts'>;
