import { Product } from '../types/Product';
import { CategoryProduct } from './CategoryProducts';

export const filterByCategory = (
  products: Product[],
  pathname: string,
  query: string,
) => {
  switch (pathname.slice(1)) {
    case CategoryProduct.Phones:
      return products.filter((product) => {
        return product.category === CategoryProduct.Phones
          && (!query || product.name.toLocaleLowerCase().includes(query));
      });
      break;
    case CategoryProduct.Tablets:
      return products.filter((product) => {
        return product.category === CategoryProduct.Tablets
          && (!query || product.name.toLocaleLowerCase().includes(query));
      });
      break;
    case CategoryProduct.Accessories:
      return products.filter((product) => {
        return product.category === CategoryProduct.Accessories
          && (!query || product.name.toLocaleLowerCase().includes(query));
      });
      break;
    default:
      return [];
  }
};
