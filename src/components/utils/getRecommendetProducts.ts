import { Product } from '../../types/products';
import { getBaseModelId } from './getBaseModels';

export const getRecommendsProducts = (
  product: Product | null,
  AllProducts: Product[],
) => {
  if (!product) {
    return null;
  }

  const markUP = 50;

  return Array.from(
    new Map(
      AllProducts.filter(
        p => p.id !== product.id && Math.abs(p.price - product.price) <= markUP,
      ).map(p => [getBaseModelId(p.itemId), p]),
    ).values(),
  );
};
