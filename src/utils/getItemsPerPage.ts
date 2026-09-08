import { ProductGeneral } from '../types/ProductGeneral';

export function getItemsPerPage(
  products: ProductGeneral[],
  itemsPerPage: number,
  selectedPage: number,
) {
  const displayedProducts = [...products];

  const startIndex = itemsPerPage * (selectedPage - 1);
  const endIndex = startIndex + itemsPerPage;

  return displayedProducts.slice(startIndex, endIndex);
}
