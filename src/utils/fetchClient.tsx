import { Phone } from '../types/Phone';
import { PhoneInfo } from '../types/PhoneInfo';

// eslint-disable-next-line max-len
export const IMG_LINK = 'https://mate-academy.github.io/react_phone-catalog/_new/';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

// eslint-disable-next-line max-len
const API_PRODUCT = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export async function getPhones(): Promise<Phone[]> {
  return fetch(API_URL)
    .then(response => response.json());
}

export async function getProduct(phoneId: string): Promise<PhoneInfo> {
  return fetch(`${API_PRODUCT + phoneId}.json`)
    .then(response => response.json());
}

export const getHotPriceProducts = (): Promise<Phone[]> => {
  return getPhones()
    .then((newPhones) => newPhones
      .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price)));
};

export const getBrandNewProducts = (): Promise<Phone[]> => {
  return getPhones()
    .then((newPhones) => {
      const sortedPhones = newPhones
        .sort((a, b) => b.year - a.year)
        .sort((a, b) => b.price - a.price);

      return sortedPhones.filter(phone => sortedPhones[0].year === phone.year)
        .map((phone) => ({ ...phone, fullPrice: 0 }));
    });
};
