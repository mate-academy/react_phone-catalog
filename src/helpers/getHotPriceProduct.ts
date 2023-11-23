import { Product } from '../Types/Product';

export const getHotPriceProduct = (items:Product[]) => {
  const hotPriceProduct = [...items]
    .filter(item => item.discount)
    .sort((a, b) => b.price * b.discount - a.price * a.discount);

  return hotPriceProduct;
};
