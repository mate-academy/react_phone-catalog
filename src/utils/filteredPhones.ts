import { Product } from '../types/Product';
import { Action } from '../types/Status';

export function filteredPhones(
  phones: Product[],
  sort: string,
) {
  switch (sort) {
    case Action.name:
      return [...phones]
        .sort((a, b) => a.name.localeCompare(b.name));
    case Action.price:
      return [...phones]
        .sort((a, b) => a.price - b.price);
    case Action.age:
      return [...phones]
        .sort((a, b) => b.year - a.year);
    default:
      return [...phones];
  }
}
