import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

// export function sortBy<T extends { id: string }>(
//   products: Product[],
//   array: T[],
//   sortBy: SortBy,
// ): T[] {
//   const copyArray: T[] = [];
//   const copyProducts: Product[] = [...products];

//   switch (sortBy) {
//     case 'newest':
//       copyProducts.sort((a, b) => b.year - a.year);
//       break;

//     case 'alphabetical':
//       copyProducts.sort((a, b) => a.name.localeCompare(b.name));
//       break;

//     case 'cheapest':
//       copyProducts.sort((a, b) => a.price - b.price);
//       break;
//   }

//   copyProducts.forEach(product => {
//     const match = array.find(item => item.id === product.itemId);

//     if (match) {
//       copyArray.push(match);
//     }
//   });

//   return copyArray;
// }

export function sortBy<T extends { id: string }>(
  products: Product[],
  array: T[],
  sortBy: SortBy,
): T[] {
  const idToItemMap = new Map<string, T>();
  array.forEach(item => idToItemMap.set(item.id, item));

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'newest':
      sortedProducts.sort((a, b) => b.year - a.year);
      break;

    case 'alphabetical':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'cheapest':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
  }

  return sortedProducts
    .map(product => idToItemMap.get(product.itemId))
    .filter((item): item is T => item !== undefined);
}

