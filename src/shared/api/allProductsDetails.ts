import { ProductDetails } from '../types/ProductDetails';
import { withBase } from '../../shared/styles/constants';

const PHONES_URL = withBase(`api/phones.json`);
const TABLETS_URL = withBase(`api/tablets.json`);
const ACCESSORIES_URL = withBase(`api/accessories.json`);

export const getAllProducts = async (): Promise<ProductDetails[]> => {
  const allProducts = await Promise.all([
    fetch(PHONES_URL).then(r => r.json()),
    fetch(TABLETS_URL).then(r => r.json()),
    fetch(ACCESSORIES_URL).then(r => r.json()),
  ]).then(arrays => arrays.flat());

  return allProducts;
};
