import { ProductType } from '../types/product.types';

type NormalizePrice = {
  currentPrice: number;
  oldPrice: number | null;
};

export const getProductPrice = (product: ProductType): NormalizePrice => {
  if (product.priceDiscount && product.priceRegular) {
    return {
      currentPrice: product.priceDiscount,
      oldPrice:
        product.priceRegular > product.priceDiscount
          ? product.priceRegular
          : null,
    };
  }

  if (product.fullPrice && product.price) {
    return {
      currentPrice: product.price,
      oldPrice: product.fullPrice > product.price ? product.fullPrice : null,
    };
  }

  return {
    currentPrice: product.price || product.priceDiscount || 0,
    oldPrice: null,
  };
};
