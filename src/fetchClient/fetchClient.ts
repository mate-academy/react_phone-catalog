import products from '../api/products.json';
import phones from '../api/phones.json';
import tablets from '../api/tablets.json';
import accessories from '../api/accessories.json';
import { SliderProduct } from '../types/SliderProduct';
import { CatalogProduct } from '../types/CatalogProduct';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function getData<T>(items: T): Promise<T> {
  return wait(2000).then(() => {
    return items;
  });
}

export function getProducts() {
  return getData<SliderProduct[]>(products);
}

export function getPhones() {
  return getData<CatalogProduct[]>(phones);
}

export function getTablets() {
  return getData<CatalogProduct[]>(tablets);
}

export function getAccessories() {
  return getData<CatalogProduct[]>(accessories);
}
