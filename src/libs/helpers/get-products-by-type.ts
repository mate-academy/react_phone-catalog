import {
  HOT_PRICE_DISCOUNT, NEW_PRODUCT_YEAR, ProductsCategories, ProductsFilters,
} from '../enums';
import { ProductType } from '../types';
import { getRandomProducts } from './get-random-products';

export const getProductsByCategory = (
  products: ProductType[],
  category: ProductsCategories | ProductsFilters,
) => {
  if (category === ProductsFilters.SUGGESTED) {
    return getRandomProducts(products);
  }

  return products.filter(product => {
    const { fullPrice, price, year } = product;

    switch (category) {
      case ProductsCategories.PHONES:
      case ProductsCategories.TABLETS:
      case ProductsCategories.ACCESSORIES:
        return product.category === category;

      case ProductsFilters.HOT_PRICE: {
        const discount = ((fullPrice - price) / fullPrice) * 100;

        return discount >= HOT_PRICE_DISCOUNT;
      }

      case ProductsFilters.NEW:
        return year >= NEW_PRODUCT_YEAR;

      default:
        return false;
    }
  });
};
