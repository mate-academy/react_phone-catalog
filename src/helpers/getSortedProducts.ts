import { ProductFull } from '../types/Product_full';

export const getSortedProducts = (items: ProductFull[], value: string) => {
  const sortedProducts = [...items];

  switch (value) {
    case 'age':
      sortedProducts.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      break;
    case 'price':
      sortedProducts.sort((a, b) => a.priceDiscount - b.priceDiscount);
      break;
    case 'name':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      return sortedProducts;
  }

  return sortedProducts;
};
