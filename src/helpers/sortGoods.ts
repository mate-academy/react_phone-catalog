import { Phone } from '../type/Phone';
import { SortBy } from '../type/SortByOptions';

export function sortGoods(phones: Phone[], status: string) {
  switch (status) {
    case SortBy.NEWEST:
      return phones.sort((a, b) => b.year - a.year);

    case SortBy.CHEAPEST:
      return phones.sort((a, b) => a.fullPrice - b.fullPrice);

    case SortBy.ALPHABETICALLY:
      return phones.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    default:
      return phones;
  }
}
