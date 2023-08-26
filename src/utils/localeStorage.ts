/* eslint-disable no-console */
import { getProducts } from '../api/getProducts';
import { Product } from '../types/Phone';

export enum LocaleDataTypes {
  FAVORITES = 'favorites',
  CART = 'cart',
}

export function setStorage(id: string, data: LocaleDataTypes) {
  getProducts().then((products) => {
    const product = products.find((p: Product) => p.id === id);
    const newProduct = { amount: 1, ...product };

    const productsList = localStorage.getItem(data);

    const productsListObj = productsList ? JSON.parse(productsList) : {};

    if (productsListObj[id]) {
      delete productsListObj[id];
      localStorage.setItem(data, JSON.stringify(productsListObj));
    } else {
      productsListObj[id] = newProduct;
      localStorage.setItem(data, JSON.stringify(productsListObj));
    }
  });
}

export function addProductToCart(id: string) {
  const productsFromCart = localStorage.getItem(LocaleDataTypes.CART);

  const productsListObj = productsFromCart
    ? JSON.parse(productsFromCart)
    : {};

  if (productsListObj[id]) {
    productsListObj[id].amount += 1;
    localStorage.setItem(LocaleDataTypes.CART, JSON.stringify(productsListObj));
  }
}

export function removeProductFromCart(id: string) {
  const productsFromCart = localStorage.getItem(LocaleDataTypes.CART);

  const productsListObj = productsFromCart
    ? JSON.parse(productsFromCart)
    : {};

  if (productsListObj[id]) {
    productsListObj[id].amount -= 1;
    localStorage.setItem(LocaleDataTypes.CART, JSON.stringify(productsListObj));
  }
}

export function getAmountOfProducts(id: string): number {
  const productsFromCart = localStorage.getItem(LocaleDataTypes.CART);

  const product = productsFromCart
    ? JSON.parse(productsFromCart)[id]
    : 0;

  return product.amount || 1;
}

export function isAdded(id: string, data: LocaleDataTypes) {
  return JSON.stringify(localStorage.getItem(data)).includes(id);
}
