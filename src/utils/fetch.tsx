import { Products, SortType } from './types';

export const fetchProducts = async (
  category: string,
  sortBy: SortType,
): Promise<Products[]> => {
  try {
    const response = await fetch(`/api/products.json`);
    const data = await response.json();

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
      default:
        break;
    }

    return filteredProducts;
  } catch (error) {
    throw new Error('Error');

    // return [];
  }
};
