import { ProductDetails } from '../types/ProductDetails';

const PHONES_URL = `${import.meta.env.BASE_URL}api/phones.json`;
const TABLETS_URL = `${import.meta.env.BASE_URL}api/tablets.json`;
const ACCESSORIES_URL = `${import.meta.env.BASE_URL}api/accessories.json`;

export const getAllProducts = async (): Promise<ProductDetails[]> => {
  const allProducts = await Promise.all([
    fetch(PHONES_URL).then(r => r.json()),
    fetch(TABLETS_URL).then(r => r.json()),
    fetch(ACCESSORIES_URL).then(r => r.json()),
  ]).then(arrays => arrays.flat());

  return allProducts;
};
