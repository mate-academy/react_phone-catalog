import { PerPageValue, Product, SortValue } from '../types/Product';

export const getDiscount = (product: Product) => {
  return product.fullPrice - product.price;
};

export const sortProducts = (products: Product[], sort: SortValue) => {
  return [...products].sort((firstProduct, secondProduct) => {
    switch (sort) {
      case 'title':
        return firstProduct.name.localeCompare(secondProduct.name);

      case 'price':
        return firstProduct.price - secondProduct.price;

      case 'age':
      default:
        return secondProduct.year - firstProduct.year;
    }
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  perPage: PerPageValue,
) => {
  if (perPage === 'all') {
    return products;
  }

  const itemsPerPage = Number(perPage);
  const start = (page - 1) * itemsPerPage;

  return products.slice(start, start + itemsPerPage);
};

export const getTotalPages = (totalItems: number, perPage: PerPageValue) => {
  if (perPage === 'all') {
    return 1;
  }

  return Math.ceil(totalItems / Number(perPage));
};
