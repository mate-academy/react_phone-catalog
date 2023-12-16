import { ProductType } from '../types/ProductType';

export function isProductFavorite(
  favoriteProducts: ProductType[],
  product: ProductType,
) {
  const copy = [...favoriteProducts];

  return copy.map(fav => JSON.stringify(fav))
    .includes(JSON.stringify(product));
}

export function isProductCarted(
  cartedProducts: ProductType[],
  product: ProductType,
) {
  const copy = [...cartedProducts];

  return copy.map(car => JSON.stringify(car))
    .includes(JSON.stringify(product));
}
