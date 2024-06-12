import { Product } from '../types/Product';

export const filterBy = (
  products: Product[],
  category: string,
  searchQuery = '',
) => {
  return products.filter(product => {
    const loverName = product.name.toLocaleLowerCase();
    const loverQuery = searchQuery.toLocaleLowerCase();

    return product.category === category && loverName.includes(loverQuery);
  });
};
