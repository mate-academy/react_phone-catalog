import { Product } from '../types/Product';

export const getHotPriceProducts = (items:Product[]) => {
  const hotPriceProducts = [...items]
    .filter(item => item.discount)
    .sort((a, b) => b.price * b.discount - a.price * a.discount);

  return hotPriceProducts;
};
