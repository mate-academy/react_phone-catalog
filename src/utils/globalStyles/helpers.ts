import { Product } from "../../types/Product";

export function sortBySearchParams(
  products: Product[],
  pageNumber: number,
  sortBy: string = 'newest',
  itemsOnPage: number = 16,
) {
  const newProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  if (itemsOnPage === Infinity) {
    return newProducts;
  }

  const firstItemOnPage = (pageNumber - 1) * itemsOnPage;
  const lastItemOnPage = firstItemOnPage + itemsOnPage;

  return newProducts.slice(firstItemOnPage, lastItemOnPage);
}
