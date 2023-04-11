import { SortBy } from '../types/SortBy';
import { Phone } from '../types/Phone';

export const sortedList = (phones: Phone[], sortBy: SortBy) => {
  switch (sortBy) {
    case SortBy.Alphabetically:
      return [...phones].sort((a, b) => a.name.localeCompare(b.name));
    case SortBy.Cheapest:
      return [...phones].sort((a, b) => a.price - b.price);
    default:
      return [...phones].sort((a, b) => b.year - a.year);
  }
};

export const filteredList = (phones: Phone[], querry: string | null) => {
  return querry
    ? phones.filter(phone => {
      return phone.name.toLocaleLowerCase().includes(
        querry.toLocaleLowerCase(),
      );
    })
    : phones;
};

export const filterFavourites = (
  phones: Phone[],
  favourites: string[],
) => {
  return phones.filter(phone => favourites.includes(phone.id));
};
