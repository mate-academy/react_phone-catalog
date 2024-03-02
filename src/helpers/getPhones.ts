import { Phone } from '../types/Phone';

export const getPhones = async (): Promise<Phone[]> => {
  const data = await fetch(
    'https://mate-academy.github.io/react_phone-catalog/api/products.json',
  );

  const products: Phone[] = await data.json();
  const phones = products.filter(product => product.type === 'phone');

  return phones;
};
