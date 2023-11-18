import { Product } from '../type/Product';

export const getHotPriceProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount);
};

export const getBrandNewProducts = (products: Product[]) => {
  return products.sort((a, b) => b.fullPrice - a.fullPrice);
};

export function getTablets(
  products: Product[],
) {
  const visibleTablets = products.filter(el => el.category === 'tablets');

  return visibleTablets;
}

export const getCartItems = (localStore: Product[]) => {
  return localStore.filter(el => el.inCart);
};

export const getCartFavorites = (localStore: Product[]) => {
  return localStore.filter(el => el.inFavourite);
};
