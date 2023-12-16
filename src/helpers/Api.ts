/* eslint-disable no-console */
import { Product } from './Product';

const path = './_new/products.json';

export const fetchData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    throw error;
  }
};

export const fetchTypeDevice
= async (categoryFilter: string): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    // Dodaj opóźnienie 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtruj obiekty z określoną wartością atrybutu "category"
    const filteredData = jsonData.filter((item: Product) => (
      item.category === categoryFilter));

    return filteredData;
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    throw error;
  }
};
