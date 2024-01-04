import { ProductType } from '../types/ProductType';

export function getProductsByKey(
  products: ProductType[],
  key: keyof ProductType,
  query: string | number,
) {
  return [...products].filter(product => product[key] === query);
}

export function getProductsByQuery(
  products: ProductType[],
  query: string | number,
) {
  return [...products].filter(product => product.name.toLowerCase()
    .includes(query.toString().toLowerCase()));
}

export function getNewProducts(products: ProductType[]) {
  return [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 8);
}
