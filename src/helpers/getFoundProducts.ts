import { Product } from '../types/Product';

export function getFoundProducts(
  query: string, products: Product[],
): Product[] {
  const currentQuery = query.trim().toLowerCase().split(' ');
  let result: Product[] = products;

  currentQuery.forEach(q => {
    result = result.filter(product => product.name.toLowerCase()
      .includes(q));
  });

  return result;
}
