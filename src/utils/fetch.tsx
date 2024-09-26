import { Products, SortType } from './types';

export const fetchProducts = (
  category: string,
  sortBy: SortType,
): Promise<Products[]> => {
  return fetch(`/api/products.json`)
    .then(response => response.json())
    .then(data => {
      const filteredProducts: Products[] = data.filter(
        (product: Products) => product.category === category,
      );

      switch (sortBy) {
        case SortType.newest:
          filteredProducts.sort((a, b) => b.year - a.year);
          break;
        case SortType.hotPrice:
          filteredProducts.sort(
            (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
          );
          break;
        case SortType.alpha:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case SortType.cheapest:
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      return filteredProducts;
    });
};
