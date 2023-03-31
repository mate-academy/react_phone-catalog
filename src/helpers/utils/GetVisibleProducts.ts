import { Product } from '../types/Product';

export const getVisibleProduct = (
  products: Product[],
  sortBy: string,
  itemPerPage: number,
  page: number,
) => {
  const start = itemPerPage * (page - 1);
  const end = itemPerPage * page;

  return [...products].sort((prevProd, currProd) => {
    switch (sortBy) {
      case 'age':
      case 'price':
        return prevProd[sortBy] - currProd[sortBy];

      case 'name':
        return prevProd[sortBy].localeCompare(currProd[sortBy]);

      default:
        return 0;
    }
  }).slice(start, end);
};
