import { Product } from '../types/Product';

export const getPreperedProducts = (products: Product[], sortField: string) => {
  const preperedProducts = [...products];

  if (sortField) {
    preperedProducts.sort((a, b) => {
      switch (sortField) {
        case 'Newest': {
          return b.year - a.year;
        }

        case 'Alphabetically': {
          return a.name.localeCompare(b.name);
        }

        case 'Cheapest': {
          return a.fullPrice - b.fullPrice;
        }

        default:
          return 0;
      }
    });
  }

  return preperedProducts;
};
