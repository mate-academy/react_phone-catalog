import { SortBy } from '../../../shared/constants/sortBy';
import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const sortProducts = (
  products: AllProducts[],
  sortBy: string,
): AllProducts[] => {
  const sortProduct = [...products];

  switch (sortBy) {
    case SortBy.Newest:
      return sortProduct.sort((a, b) => b.year - a.year);

    case SortBy.Alphabetically:
      return sortProduct.sort((a, b) => a.name.localeCompare(b.name));

    case SortBy.LowPrice:
      return sortProduct.sort((a, b) => a.price - b.price);

    case SortBy.HighPrice:
      return sortProduct.sort((a, b) => b.price - a.price);

    default:
      return sortProduct;
  }
};
