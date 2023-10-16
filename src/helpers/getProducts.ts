import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

/* eslint-disable max-len */
const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export const getPhones = async (): Promise<Product[]> => {
  const data: Promise<Product[]> = (await fetch(`${URL}.json`)).json();

  const filteredData = (await data).filter(item => item.category === 'phones');

  return filteredData;
};

export const getHotPriceProducts = async (): Promise<Product[]> => {
  const data: Promise<Product[]> = (await fetch(`${URL}.json`)).json();

  const sortedData = (await data).sort((a, b) => a.price - b.price);

  return sortedData;
};

export const getBrandNewProducts = async (): Promise<Product[]> => {
  const data: Promise<Product[]> = (await fetch(`${URL}.json`)).json();

  const sortedData = (await data).sort((a, b) => b.fullPrice - a.fullPrice);

  return sortedData;
};

export const getProductDetails = async (productId: string): Promise<ProductDetails> => {
  const data: Promise<ProductDetails> = (await fetch(`${URL}/${productId}.json`)).json();

  return data;
};

export const getSuggestedProducts = async (): Promise<Product[]> => {
  const data: Promise<Product[]> = (await fetch(`${URL}.json`)).json();

  const shuffledObjects = [...await data];

  for (let i = shuffledObjects.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledObjects[i], shuffledObjects[j]] = [shuffledObjects[j], shuffledObjects[i]];
  }

  return shuffledObjects;
};
