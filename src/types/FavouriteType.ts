import { Product } from './Product';

export type FavouriteType = Omit<Product, 'year'>;
