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
        throw Error(`Failed to fetch products. Status: ${response.status}`);
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Failed to get content-type');
      }

      return response.json();
    });
};

export const getAllProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products;
};

export const getHotProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort(
    (a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
  );
};

export const getBrandNewProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort(
    (a, b) => b.price - a.price,
  );
};

export const getProductDetails = async (id: string) => {
  const productDetailsResponse = await fetch(`${detailsURL}${id}.json`);

  if (!productDetailsResponse.ok) {
    throw new Error('Failed to fetch product details');
  }

  const productDetails: ProductDetails = await productDetailsResponse.json();

  return productDetails;
};

export const getProductById = async (productId: string) => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.find(({ phoneId }) => phoneId === productId);
};

export const getSuggestedProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  return shuffledProducts;
};
