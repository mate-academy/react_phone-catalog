import { Item } from '../types/Item';

export const getProductsByPage
  = (products: Item[], page: number, countPerPage: number) => {
    const start = (page - 1) * countPerPage;
    const end = start + countPerPage;

    return products.slice(start, end);
  };
