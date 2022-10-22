import { Product } from '../types/Product';

export const getHotPriceProduct = (products: Product[]) => {
  const hotPriceProduct: Product[] = [];

  products.forEach(product => {
    if (!product.discount) {
      return;
    }

    hotPriceProduct.push(product);
  });

  const difference = (oldPrice: number, discount: number) => {
    const newPrice = oldPrice - (discount * oldPrice) / 100;

    return oldPrice - newPrice;
  };

  hotPriceProduct.sort(
    (a, b) => difference(a.price, a.discount) - difference(b.price, b.discount),
  );

  return hotPriceProduct.reverse();
};
