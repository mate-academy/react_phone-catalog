import { Phone } from '../types/Phone';

export const getData = async (): Promise<Phone[]> => {
  const data = await fetch(
    'https://mate-academy.github.io/react_phone-catalog/api/products.json',
  );

  return data.json();
};
