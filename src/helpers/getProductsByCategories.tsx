import { Product } from '../type/Product';

export const getHotPriceProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount);
};

export const getBrandNewProducts = (products: Product[]) => {
  return products.sort((a, b) => b.fullPrice - a.fullPrice);
};

export const getSuggestedProducts = (products: Product[]) => {
  const allIds: number[] = [];
  const copyProducts = [...products];

  copyProducts.forEach(product => {
    if (!product.inFavourite && !product.isAddCard) {
      allIds.push(+product.id);
    }
  });

  const shuffledIds = allIds.sort(() => Math.random() - 0.5);
  const selectedIds = shuffledIds.slice(0, 10);

  return copyProducts.filter(el => selectedIds.includes(+el.id));
};

export function getTablets(
  products: Product[],
) {
  const visibleTablets = products.filter(el => el.category === 'tablets');

  return visibleTablets;
}
