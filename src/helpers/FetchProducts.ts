/* eslint-disable max-len */
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
// import { ProductType } from '../types/ProductTypes';

export const URL_NEW = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
// export const URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
export const detailsURL = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const getProducts = (url: string) => {
  // console.log('start getProducts');

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error();
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error();
    }

    return response.json();
  });
};

export const getAllProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products;
};

export const getHotPriceProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
};

export const getBrandNewProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort((a, b) => b.price - a.price);
};

export const getProductDetails = async (id:string) => {
  const productDetails: ProductDetails = await getProducts(`${detailsURL}${id}.json`);

  return productDetails;
};

export const getSuggestedProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  return shuffledProducts;
};

export const getProductById = async (productId: string) => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.find(({ phoneId }) => phoneId === productId);
};

// console.log(getProductDetails('apple-iphone-11-pro-256gb-midnightgreen'));

// export const getPhones = async () => {
//   const products: Product[] = await getProducts(URL_NEW);

//   return products.filter(product => product.category === ProductType.Phone);
// };
