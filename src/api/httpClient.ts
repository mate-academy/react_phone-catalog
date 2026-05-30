import axios from 'axios';
import { ProductFull } from '../types/Product_full';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const getAllProducts = async () => {
  return fetch('api/products.json').then(handleResponse);
};

const getPhones = () => {
  return fetch('api/phones.json').then(handleResponse);
};

const getTablets = async () => {
  return fetch('api/tablets.json').then(handleResponse);
};

const getAccessories = async () => {
  return fetch('api/accessories.json').then(handleResponse);
};

const getProductById = async (
  productId: string,
  category: string,
): Promise<ProductFull | undefined> => {
  try {
    const res = await axios.get<ProductFull[]>(`api/${category}.json`);

    return res.data.find(phone => phone.id === productId);
  } catch (error) {
    throw error;
  }
};

export const client = {
  getPhones,
  getTablets,
  getAccessories,
  getProductById,
  getAllProducts,
};
