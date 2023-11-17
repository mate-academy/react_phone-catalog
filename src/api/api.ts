import { PhoneType } from '../Types/PhoneType';

const baseUrl = '/_new/products/';

export const api = {
  getInfo: {
    phone: async (productId = '') => {
      const response = await fetch(`${baseUrl}${productId}.json`);
      const data: PhoneType = await response.json();

      return data;
    },
  },
};
