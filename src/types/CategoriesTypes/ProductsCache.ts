import { Product } from './Product';

export interface ProductsCache {
  [namespaceId: string]: Product[];
}
