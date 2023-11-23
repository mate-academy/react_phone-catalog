import { Product } from '../types/productType';

export const getSortedProducts = (
  products: Product[],
  sort: string,
  query: string | null,
) => {
  const queries = query?.toString().toLowerCase().split(' ');

  const filterdPhones = queries
    ? [...products].filter(phone => (
      queries.every(word => phone.name.toLowerCase().trim().includes(word))
    ))
    : [...products];

  if (sort === 'age') {
    return filterdPhones.sort((a, b) => +b.year - +a.year);
  }

  if (sort === 'name') {
    return filterdPhones.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    return filterdPhones.sort((a, b) => a.price - b.price);
  }

  return filterdPhones;
};
