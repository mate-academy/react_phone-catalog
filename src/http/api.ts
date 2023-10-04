import axios from 'axios';
import env from 'react-dotenv';

import { ENDPOINT_GET_PRODUCTS_DATA } from './endpoints';

export const { CDN_URL } = env;

export const fetchProducts = async () => {
  return axios.get(`${CDN_URL}${ENDPOINT_GET_PRODUCTS_DATA}.json`);
};

export const fetchProduct = async (phoneId: string) => {
  return axios.get(`${CDN_URL}${ENDPOINT_GET_PRODUCTS_DATA}/${phoneId}.json`);
};
