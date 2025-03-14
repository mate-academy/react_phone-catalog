// import phones from '../../public/api/phones.json';
// import tablet from '../../public/api/tablets.json';
// import accessories from '../../public/api/accessories.json';
import {
  // Accessory,
  // Phone,
  ProductDetails,
  // Tablet,
} from '../types/ProductTypes';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getPhones = async () => {
  await delay();

  return fetchData('/api/phones.json');
};

export const fetchTable = async () => {
  await delay();

  return fetchData('/api/tablets.json');
};

export const fetchAccessories = async () => {
  await delay();

  return fetchData('/api/accessories.json');
};

// export const getPhones = (): Promise<Phone[]> => {
//   return delay().then(() => phones);
// };

// export const fetchTable = (): Promise<Tablet[]> => {
//   return delay().then(() => tablet);
// };

// export const fetchAccessories = (): Promise<Accessory[]> => {
//   return delay().then(() => accessories);
// };

export const fetchAllProducts = async (): Promise<ProductDetails[]> => {
  const [phonesData, tabletsData, accessoriesData] = await Promise.all([
    getPhones(),
    fetchTable(),
    fetchAccessories(),
  ]);

  return [...phonesData, ...tabletsData, ...accessoriesData];
};
