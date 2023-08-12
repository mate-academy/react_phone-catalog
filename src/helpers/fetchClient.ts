/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/';

const request = async (url: string) => {
  const res = await fetch(BASE_URL + url);

  return res.json();
};

export const getProducts = () => request('/products.json');
export const getProductDetails = (id: string) => request(`/products/${id}.json`);
