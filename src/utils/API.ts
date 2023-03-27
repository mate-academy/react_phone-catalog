import { Gadget } from '../types/Gadjets';
import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    /* eslint-disable-next-line */
    const productsFromAPI = await fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json');

    if (productsFromAPI.ok) {
      return await productsFromAPI.json();
    }

    throw new Error('error');
  } catch {
    throw new Error('error');
  }
};

export const getPhones = async (): Promise<Product[]> => {
  try {
    const result = await getProducts();

    return result.filter(product => product.type === Gadget.Phone);
  } catch {
    throw new Error('error');
  }
};

export const getHotPriceProducts = async (): Promise<Product[]> => {
  try {
    const products = await getProducts();

    return products
      .filter(({ discount }) => !!discount)
      .sort((prodPrev, prodCurr) => prodCurr.discount - prodPrev.discount);
  } catch {
    throw new Error('error');
  }
};
