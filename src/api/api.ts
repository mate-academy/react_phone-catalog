import { PhoneType } from '../Types/PhoneType';
import { ProductType } from '../Types/ProductType';

export const baseUrl = 'https://mate-academy.github.io/react_phone-catalog';

export const api = {
  getInfo: {
    phone: async (productId = '') => {
      const response = await fetch(
        `${baseUrl}/_new/products/${productId}.json`,
      );
      const data: PhoneType = await response.json();

      return data;
    },
  },
  getNewPhones: async () => {
    const response = await fetch(`${baseUrl}/_new/products.json`);
    const data: ProductType[] = await response.json();

    return data;
  },
  getNewPhoneById: async (productId = '') => {
    const response = await fetch(`${baseUrl}/_new/products.json`);
    const data: ProductType[] = await response.json();

    const phone = data.find(item => item.itemId === productId) || null;

    return phone;
  },
};
