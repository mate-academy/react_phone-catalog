import { Product } from '../types/Product';

export const getPageProducts = (
  products: Product[],
  perPage: string,
  currentPage: string,
) => {
  if (perPage === 'all') {
    return products;
  }

  const totalItems = products.length;
  let endItem = +currentPage * +perPage;
  const startItem = endItem - +perPage;

  if (endItem > totalItems) {
    endItem = totalItems;
  }

  return products.slice(startItem, endItem);
};
