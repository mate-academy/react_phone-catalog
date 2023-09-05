import { Product } from '../types/Product';
// import { PromoProduct } from '../types/PromoProducts';

type GetPromoProducts =
  Record<string, (products: Product[]) => Product[]>;

export const getPromoProducts: GetPromoProducts = {
  hotPrices: (products: Product[]): Product[] => {
    const sortedProducts = [...products].sort((a, b) => {
      const aDiscountValue = a.fullPrice - a.price;
      const bDiscountValue = b.fullPrice - b.price;

      return bDiscountValue - aDiscountValue;
    });

    return sortedProducts;
  },

  brandNew: (products: Product[]): Product[] => {
    const sortedProducts = [...products].sort(
      (a, b) => b.fullPrice - a.fullPrice,
    );

    return sortedProducts;
  },

  suggested: (products: Product[]): Product[] => {
    const sortedProducts = [...products];

    for (let i = sortedProducts.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = sortedProducts[i];

      sortedProducts[i] = sortedProducts[randomIndex];
      sortedProducts[randomIndex] = temp;
    }

    return sortedProducts;
  },
};
