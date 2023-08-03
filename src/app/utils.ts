import { Product } from '../types/Product';
import { SelectedOptions } from '../types/SelectedOptions';
import { SortByOptions } from '../types/SortByOptions';

export function getVisibleProducts(
  arr: Product[],
  selectedOptions: SelectedOptions,
) {
  let result: Product[] = [...arr];

  switch (selectedOptions.sortBy) {
    case SortByOptions.AGE:
      result = result.sort((a, b) => b.year - a.year);
      break;
    case SortByOptions.NAME:
      result = result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortByOptions.PRICE:
      result = result.sort((a, b) => a.price - b.price);
      break;

    default:
      break;
  }

  return result;
}

export function filteringVisibleSearchedProducts(
  visibleProducts: Product[],
  searchBarValue: string,
): Product[] {
  return visibleProducts.filter((product) => {
    if (searchBarValue.trim() === '') {
      return true;
    }

    const queryWords = searchBarValue.toLowerCase().split(' ');
    const productName = product.name.toLowerCase();

    return queryWords.every((word) => productName.includes(word));
  });
}
