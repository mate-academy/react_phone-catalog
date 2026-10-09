import { Product } from '../types/Product';
import productsData from '../../public/api/products.json';

export const maxYearsByCategory = productsData.reduce<Record<string, number>>(
  (acc, p) => {
    const currentMax = acc[p.category] || 0;

    return {
      ...acc,
      [p.category]: Math.max(currentMax, p.year),
    };
  },
  {},
);

export const getProductDetails = (product: Product) => {
  const categoryMaxYear = maxYearsByCategory[product.category];

  const isBrandNew = product.year === categoryMaxYear;

  if (isBrandNew) {
    return {
      price: product.fullPrice || product.price,
      fullPrice: null,
      hasDiscount: false,
    };
  }

  const hasDiscount = Boolean(
    product.fullPrice && product.fullPrice > product.price,
  );

  return {
    price: hasDiscount ? product.price : product.fullPrice || product.price,
    fullPrice: hasDiscount ? product.fullPrice : null,
    hasDiscount,
  };
};
