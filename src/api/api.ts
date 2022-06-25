import axios from 'axios';

export const BASE_URL = 'https://mate.academy/students-api';

export const getProducts = () => axios.get(
  'https://mate-academy.github.io/react_phone-catalog/api/products.json',
);

export const getProductDetails = (id: string) => axios.get(`https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`);
