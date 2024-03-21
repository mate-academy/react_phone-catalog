import { Product } from './Product';

export type FetchFuction = (prducts: Product[]) => Promise<Product[]>;
