import {Products} from '../type/Productes';
import {SortProduct} from '../type/type';

export const filterAndSortProducts = (
  products: Products[],
  query: string,
  sortBy: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();
  const result = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );

  switch (sortBy) {
    case SortProduct.Name:
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case SortProduct.Age:
      return result.sort((a, b) => b.year - a.year);
    case SortProduct.Price:
      return result.sort((a, b) => a.price - b.price);
    default:
      return result;
  }
};

export const paginateProducts = (
  products: Products[],
  page: number,
  itemsOnPage: string,
) => {
  if (!Number(itemsOnPage)) {
    return products;
  }

  const startIndex = (page - 1) * Number(itemsOnPage);

  return products.slice(startIndex, startIndex + Number(itemsOnPage));
};
