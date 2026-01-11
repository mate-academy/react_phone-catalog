export type NameProducts = 'phones' | 'tablets' | 'accessories' | 'allProducts';

export type nameCategory = Exclude<NameProducts, 'allProducts'>;
