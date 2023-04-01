import { Product } from '../types/Product';
import { SortProduct } from '../types/sortProduct';

export const sortByProducts = (
  products: Product[],
  sortBy: string,
) => {
  switch (sortBy) {
    case SortProduct.NEW:
      return products.sort((a, b) => {
        return b.year - a.year;
      });
    case SortProduct.ALPHABETICALLY:
      return products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case SortProduct.PRICE:
      return products.sort((a, b) => {
        return a.price - b.price;
      });
    default:
      return products;
  }
};
