import { Product } from '../../types/Products';

export const paginateProducts = (
  products: Product[],
  page: number,
  perPage: string,
) => {
  if (perPage === 'all') {
    return products;
  }

  const itemsPerPage = Number(perPage);

  return products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};
