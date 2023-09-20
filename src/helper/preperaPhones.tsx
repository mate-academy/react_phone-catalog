import { Phone } from '../Type/Phone';
import { SortBy } from '../Type/SortByOptions';

export const sortPhones = (phones: Phone[], status: string) => {
  switch (status) {
    case SortBy.NEWEST:
      return phones.sort((a, b) => b.fullPrice - a.fullPrice);

    case SortBy.ALPHABETICALLY:
      return phones.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    case SortBy.CHEAPEST:
      return phones.sort((a, b) => a.fullPrice - b.fullPrice);

    default:
      return phones;
  }
};
