import { Banner } from '../type/Banner';
import { Product } from '../type/Product';

const baseUrl
= 'https://mate-academy.github.io/react_phone-catalog/api/products';
const bannerUrl = 'api/banner.json';

export const getProducts: () => Promise<Product[]> = async () => {
  const fetchJson = await fetch(`${baseUrl}.json`);
  const data: Product[] = await fetchJson.json();

  return data;
};

export const getItemProduct = async (id: string | undefined) => {
  const fetchJson = await fetch(`${baseUrl}/${id}.json`);
  const data = await fetchJson.json();

  return data;
};

export const getBanners: () => Promise<Banner[]> = async () => {
  const fetchJson = await fetch(bannerUrl);
  const data = await fetchJson.json();

  return data;
};
