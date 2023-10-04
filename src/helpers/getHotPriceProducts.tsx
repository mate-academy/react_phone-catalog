import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  const hotPriceProducts = [...products]
    .filter(product => product.discount)
    .sort((a, b) => b.price * b.discount - a.price * a.discount);

  return hotPriceProducts;
};
