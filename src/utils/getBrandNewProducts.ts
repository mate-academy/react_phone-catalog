import { Product } from '../types/Product';

export function getBrandNewProducts(prods: Product[]) {
  const maxYear = Math.max(...prods.map(p => p.year));
  const newProducts = prods
    .filter(p => p.year === maxYear);

  newProducts.sort((a, b) => {
    const productA = a.price;
    const productB = b.price;

    return productB - productA;
  });

  return newProducts;
}
