import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]): Product[] => {
  const filteredProducts = products.filter(product => {
    return product.fullPrice !== product.price;
  });

  const productsWithAbsDiscount = filteredProducts.map(product => {
    return {
      ...product,
      discountValue: product.fullPrice - product.price,
    };
  });

  const sortedProducts = productsWithAbsDiscount.sort((prodcut1, prodcut2) => {
    return prodcut2.discountValue - prodcut1.discountValue;
  });

  return sortedProducts.slice(0, 10);
};
