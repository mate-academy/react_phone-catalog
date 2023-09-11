import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const URL_NEW
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const detailsURL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const getProducts = (url: string) => {
  return fetch(url)
    .then((response) => {
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

  return products.sort((a, b) => (
    (b.fullPrice - b.price) - (a.fullPrice - a.price)));
};

export const getBrandNewProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort((a, b) => (b.price - a.price));
};

export const getProductDetails = async (id: string) => {
  const productDetails: ProductDetails = await getProducts(`${detailsURL}${id}.json`);

  return productDetails;
};

export const getSuggestedProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  return shuffledProducts;
};

export const getProductsById = async (productId: string) => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.find(({ phoneId }) => phoneId === productId);
};
