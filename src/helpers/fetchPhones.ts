// import { Phone } from "../types/Phone";

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = async (url: string) => {
  const res = await fetch(BASE_URL + url);

  return res.json();
};

export const getPhones = () => request('/products.json');
// export const getPhonesProducts = (id: string) => request(`/products/${id}.json`);
