import { Product } from '../types/Product';

export const getSearch = (
  search: URLSearchParams,
  param: { [key: string]: string },
) => {
  Object.entries(param).forEach(([key, value]) => {
    if (value === '') {
      search.delete(key);
    } else {
      search.set(key, value);
    }
  });

  return search.toString();
};

export const getSearchProducts = (products: Product[], query: string) => (
  products.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
);
