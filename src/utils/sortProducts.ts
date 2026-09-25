import { Product } from '../types/Product';

export const sortProducts = (
  products: Product[],
  sortBy: string,
): Product[] => {
  const copy = [...products];

  switch (sortBy) {
    case 'newest':
      return copy.sort(
        (prod1, prod2) => Number(prod2.year) - Number(prod1.year),
      );
    case 'most-expensive':
      return copy.sort(
        (prod1, prod2) => Number(prod2.price) - Number(prod1.price),
      );
    case 'cheapest':
      return copy.sort(
        (prod1, prod2) => Number(prod1.price) - Number(prod2.price),
      );

    case 'hottest':
      return copy.sort((prod1, prod2) => {
        const discount1 = Number(prod1.fullPrice) - Number(prod1.price);
        const discount2 = Number(prod2.fullPrice) - Number(prod2.price);

        return discount2 - discount1;
      });

    default:
      return copy.sort(
        (prod1, prod2) => Number(prod2.year) - Number(prod1.year),
      );
  }
};
