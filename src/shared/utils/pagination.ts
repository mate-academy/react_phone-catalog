import { Product } from '../types/Product';

export const pagination = (
  products: Product[],
  currentPage: number,
  perPage: string,
) => {
  const itemsPerPage = perPage === 'all' ? products.length : Number(perPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return {
    productsToShow: products.slice(start, end),
    totalPages: Math.ceil(products.length / itemsPerPage),
  };
};
