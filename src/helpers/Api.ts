/* eslint-disable no-console */
import { ProductType, Product, ProductDetails } from './Types';

const path = './api/products.json';

export const fetchData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    await new Promise(resolve => setTimeout(resolve, 100));

    return jsonData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchTypeDevice
= async (categoryFilter: ProductType): Promise<Product[]> => {
  try {
    const response = await fetch(path);
    const jsonData = await response.json();

    await new Promise(resolve => setTimeout(resolve, 100));

    const filteredData = jsonData.filter((item: Product) => (
      item.type === categoryFilter));

    return filteredData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchDetailsData
= async (id: string): Promise<ProductDetails> => {
  try {
    const data = await fetchData();
    const product = data.find((item) => item.id === id);

    if (!product) {
      throw new Error();
    }

    const response = await fetch(`./api/products/${id}.json`);

    if (!response.ok) {
      throw new Error();
    }

    const jsonData = await response.json();

    await new Promise(resolve => setTimeout(resolve, 100));

    return { ...jsonData, ...product };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
