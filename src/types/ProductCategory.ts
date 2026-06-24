import { StoreKey } from '../app/store';

type Category = 'phones' | 'tablets' | 'accessories';

export type ProductCategory = Extract<StoreKey, Category>;
