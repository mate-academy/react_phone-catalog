/* eslint-disable no-console */

import { Phone } from '../types/Phone';

export async function getProducts() {
  try {
    const response = await fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    );
    const data = response.json();

    return await data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductsWithDiscount() {
  try {
    const response = await fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    );
    const data = await response.json();

    const discountedProducts = data
      .filter((product: Phone) => product.discount);

    return discountedProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getNewProducts() {
  try {
    const response = await fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    );

    const data = await response.json();

    const newProducts = data
      .filter((product: Phone) => product.discount === 0);

    newProducts.sort((product1: Phone, product2: Phone) => {
      return product2.price - product1.price;
    });

    return newProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
