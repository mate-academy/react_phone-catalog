import { Product } from '../types/Product';

export const filterBy = (
  products: Product[],
  category: string,
  searchQuery = '',
) => {
  return products.filter(product => {
    const loverName = product.name.toLocaleLowerCase();

    return product.type === category && loverName.includes(searchQuery);
  });
};
