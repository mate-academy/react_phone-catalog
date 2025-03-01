import { ShopItem } from "../types/ShopItem";
import { Product } from "../types/Product";

const API_URL_PHONES = '/api/phones.json';
const API_URL_TABLETS = '/api/tablets.json';
const API_URL_PRODUCTS = '/api/products.json';
const API_URL_ACCESSORIES = '/api/accessories.json';


export function getPhones(): Promise<ShopItem[]> {
  return fetch(`${ API_URL_PHONES}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}

export function getTablets(): Promise<ShopItem[]> {
  return fetch(`${ API_URL_TABLETS}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}

export function getProducts(): Promise<Product[]> {
  return fetch(`${ API_URL_PRODUCTS}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}

export function getAccessories(): Promise<ShopItem[]> {
  return fetch(`${ API_URL_ACCESSORIES}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}

