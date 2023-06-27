import { Product } from './product';

export type FavItem = Omit<Product, 'category' | 'year'>;
