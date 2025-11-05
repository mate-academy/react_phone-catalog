import { Products } from 'src/types/products';

export function sortItems(items: Products[], sortType: string) {
  switch (sortType) {
    case 'Chose One':
      return items;

    case 'Newest':
      return [...items].sort((a, b) => b.year - a.year);
    case 'Cheapest':
      return [...items].sort((a, b) => b.fullPrice - a.fullPrice);
    case 'Alphabetically':
      return [...items].sort((a, b) => a.name.localeCompare(b.name));

    default:
      return items;
  }
}
