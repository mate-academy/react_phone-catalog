import { Phone } from './types/Phone';

const API_URL
= 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export async function getPhonesList(): Promise<Phone[]> {
  const response = await fetch(API_URL);
  const phonesList = await response.json();

  return phonesList;
}
