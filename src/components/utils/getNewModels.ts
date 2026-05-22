import { Product } from '../../types/products';
import { getBaseModelId } from './getBaseModels';

export const getNewModels = (products: Product[]) => {
  const sortedProducts = Array.from(
    new Map(
      [...products]
        .sort((a, b) => b.year - a.year)
        .map(product => [getBaseModelId(product.itemId), product]),
    ).values(),
  ).slice(0, 16);

  return sortedProducts;
};
