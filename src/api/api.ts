import { PhoneType } from '../Types/PhoneType';
import { ProductType } from '../Types/ProductType';

export const baseUrl = 'https://mate-academy.github.io/react_phone-catalog';

const fetchData = async (url: string): Promise<ProductType[]> => {
  const response = await fetch(url);

  return response.json();
};

const fetchPhoneData = async (productId = ''): Promise<PhoneType> => {
  const response = await fetch(`${baseUrl}/_new/products/${productId}.json`);

  return response.json();
};

export const api = {
  getInfo: {
    phone: fetchPhoneData,
  },
  getNewPhones: async () => fetchData(`${baseUrl}/_new/products.json`),
  getExpensivePhones: async () => {
    const data = await fetchData(`${baseUrl}/_new/products.json`);

    return data.sort((a, b) => b.fullPrice - a.fullPrice);
  },
  getCheapPhones: async () => {
    const data = await fetchData(`${baseUrl}/_new/products.json`);

    return data.sort((a, b) => a.price - b.price);
  },
  getSuggestedProducts: async () => {
    const data = await fetchData(`${baseUrl}/_new/products.json`);

    for (let i = data.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [data[i], data[j]] = [data[j], data[i]];
    }

    return data;
  },
  getProductById: async (productId = '') => {
    const data = await fetchData(`${baseUrl}/_new/products.json`);

    return data.find(item => item.itemId === productId) || null;
  },
};
