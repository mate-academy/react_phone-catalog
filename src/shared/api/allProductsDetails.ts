import { ProductDetails } from '../types/ProductDetails';

// const BASE_URL = process.env.PUBLIC_URL || '';

const PHONES_URL = `/api/phones.json`;
const TABLETS_URL = `/api/tablets.json`;
const ACCESSORIES_URL = `/api/accessories.json`;

export const getAllProducts = async (): Promise<ProductDetails[]> => {
  const allProducts = await Promise.all([
    fetch(PHONES_URL).then(r => r.json()),
    fetch(TABLETS_URL).then(r => r.json()),
    fetch(ACCESSORIES_URL).then(r => r.json()),
  ]).then(arrays => arrays.flat());

  return allProducts;
};
