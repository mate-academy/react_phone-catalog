import { Product } from '../types/product';

export const filterProducts = ({
  products,
  sortBy,
  itemsOnPage,
  query,
  page,
}: {
  products: Product[];
  sortBy: string | null;
  itemsOnPage: string | null;
  query: string | null;
  page: string | null;
}) => {
  const sortedProducts = [...products].sort((product1, product2) => {
    switch (sortBy) {
      case 'age':
        return product2.year - product1.year;

      case 'name':
        return product1.name.localeCompare(product2.name);

      case 'price':
        return product1.price - product2.price;

      default:
        return product2.year - product1.year;
    }
  });

  if (query !== null) {
    sortedProducts.filter(product => product.name.includes(query));
  }

  const filteredProducts = query
    ? sortedProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase().trim()),
      )
    : sortedProducts;

  if (itemsOnPage) {
    const limit = parseInt(itemsOnPage, 10);
    const currentPage = page ? parseInt(page, 10) : 1;

    if (!isNaN(limit) && currentPage > 0) {
      const startIndex = limit * (currentPage - 1);
      const lastIndex = limit * currentPage;

      return filteredProducts.slice(startIndex, lastIndex);
    }
  }

  return filteredProducts;
};
