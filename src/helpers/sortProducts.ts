import { ProductInfo } from '../types/ProductInfo';

export const sortProducts = (sort: string, products: ProductInfo[]) => {
  switch (sort) {
    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.priceDiscount - b.priceRegular);

    default:
      return [...products].sort((a, b) => b.priceRegular - a.priceRegular);
  }
};
