import { Product } from '../types/Product';

export function filteringByQuery(prods: Product[], query: string) {
  return prods.filter(product => product.name
    .toLowerCase()
    .includes(query.toLowerCase()));
}
