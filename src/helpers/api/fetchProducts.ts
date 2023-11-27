import { Product, ProductDetails } from '../../types/Product';
import { ProductTypes } from '../../types/ProductTypes';
import {
  getAmout,
  sortByDiscountCallBack,
  sortByPriceCallback,
} from '../calc/helper';
import { detailsURL, URL } from '../constants/constants';

export const getProducts = (url: string) => {
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

export const getHotPriceProducts = async () => {
  const products: Product[] = await getProducts(URL);

  return products.sort(sortByDiscountCallBack);
};

export const getBrandNewProducts = async () => {
  const products: Product[] = await getProducts(URL);

  return products.sort(sortByPriceCallback);
};

export const getAmountOfProducts = async () => {
  const products: Product[] = await getProducts(URL);
  const phones = getAmout(products, ProductTypes.Phones).length;
  const tablets = getAmout(products, ProductTypes.Tablets).length;
  const acces = getAmout(products, ProductTypes.Accessories).length;

  return [phones, tablets, acces];
};

const getCertainProducts = async (type: ProductTypes) => {
  const products: Product[] = await getProducts(URL);

  return products.filter((product) => product.category === type);
};

export const get = {
  phones: () => getCertainProducts(ProductTypes.Phones),
  tablets: () => getCertainProducts(ProductTypes.Tablets),
  accessories: () => getCertainProducts(ProductTypes.Accessories),
};

export const getProductDetailsById = async (id: string) => {
  const productDetails: ProductDetails = await getProducts(`${detailsURL}${id}.json`);

  return productDetails;
};

export const getProductById = async (productId: string) => {
  const products: Product[] = await getProducts(`${URL}`);

  return products.find(({ phoneId }) => phoneId === productId);
};

const randomSortCallback = () => {
  return 0.5 - Math.random();
};

export const getSuggestedProducts = async () => {
  const products: Product[] = await getProducts(URL);

  return products.sort(randomSortCallback);
};
