import { Product } from '../types/productType';

export const getSortedProducts = (
  products: Product[],
  sort: string,
  query: string | null,
) => {
  const filterdPhones = query
    ? [...products].filter(phone => phone.name.toLowerCase().trim()
      .includes(query.toString().toLowerCase()))
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
