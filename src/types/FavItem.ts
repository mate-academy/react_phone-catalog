import { Product } from './Product';

// export type FavItem = Omit<Product, 'year' | 'color'> & { discount: boolean };
export type FavItem = Product & { discount: boolean };
