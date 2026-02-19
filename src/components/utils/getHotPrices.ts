import { Product } from '../../types/products';
import { getBaseModelId } from './getBaseModels';

export const getHotPrices = (products: Product[]) => {
  const sortedProducts = Array.from(
    new Map(
      [...products]
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .map(product => [getBaseModelId(product.itemId), product]),
    ).values(),
  ).slice(0, 16);

  return sortedProducts;
};
