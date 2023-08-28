/* eslint-disable max-len */
/* eslint-disable no-console */
import { Product } from '../types/Phone';

const PRODUCT_LIST_LINK = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

export async function getProducts() {
  try {
    const response = await fetch(PRODUCT_LIST_LINK);
    const data = response.json();

    return await data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductsWithDiscount() {
  try {
    const response = await fetch(PRODUCT_LIST_LINK);
    const data = await response.json();

    const discountedProducts = data
      .filter((product: Product) => product.discount);

    return discountedProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getNewProducts() {
  try {
    const response = await fetch(PRODUCT_LIST_LINK);

    const data = await response.json();

    const newProducts = data
      .filter((product: Product) => product.discount === 0);

    newProducts.sort((product1: Product, product2: Product) => {
      return product2.price - product1.price;
    });

    return newProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductsWithType(type: ProductType) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(PRODUCT_LIST_LINK);
    const data = await response.json();

    const phonesOnly = data.filter((product: Product) => product.type === type);

    return phonesOnly;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getSingleProduct(id: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getSuggestedProducts() {
  try {
    const response = await fetch(PRODUCT_LIST_LINK);
    const data = await response.json();
    const shuffledProducts = [...data];

    for (let i = shuffledProducts.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [
        shuffledProducts[i],
        shuffledProducts[j],
      ] = [
        shuffledProducts[j],
        shuffledProducts[i],
      ];
    }

    return shuffledProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
