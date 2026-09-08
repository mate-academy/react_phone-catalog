import { SortBy } from '../pages/ProductsPage/components/Dropdown';
import { ProductGeneral } from '../types/ProductGeneral';

export function getFilteredItems(
  products: ProductGeneral[],
  sortBy: string,
  query: string,
) {
  let displayedProducts = [...products];

  if (query) {
    displayedProducts = displayedProducts.filter(product => {
      const normalizedName = product.name.toLowerCase();
      const normalizedQuery = query.toLowerCase();

      return normalizedName.includes(normalizedQuery);
    });
  }

  displayedProducts.sort((item1, item2) => {
    switch (sortBy) {
      case SortBy.newest:
        return item2.year - item1.year;
      case SortBy.cheapest:
        return item1.price - item2.price;
      case SortBy.name:
        return item1.itemId.localeCompare(item2.itemId);
      default:
        return item2.year - item1.year;
    }
  });

  return displayedProducts;
}
