/* eslint-disable no-console */
import { PageType, Product } from './Types';

const path = './api/products.json';

export const fetchData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    await new Promise(resolve => setTimeout(resolve, 100));

    return jsonData;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    throw error;
  }
};

export const fetchTypeDevice
= async (categoryFilter: PageType): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    await new Promise(resolve => setTimeout(resolve, 100));

    const filteredData = jsonData.filter((item: Product) => (
      item.type === categoryFilter));

    return filteredData;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    throw error;
  }
};
