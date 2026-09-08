import { Product } from '../../../types/Product';

export const prepareProductList = (
  products: Product[],
  { sortBy, query }: { sortBy: string; query: string },
): Product[] => {
  let filteredProducts = [...products];

  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (sortBy) {
    case 'Newest':
      return filteredProducts.sort((a, b) => b.year - a.year);
    case 'Alphabetically':
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'Cheapest':
      return filteredProducts.sort((a, b) => a.fullPrice - b.fullPrice);
    default:
      return filteredProducts;
  }
};
