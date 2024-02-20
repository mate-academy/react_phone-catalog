/* eslint-disable max-len */
import { Product } from '../types/Product';
import { ProductCategory } from '../types/ProductCategory';
import { client } from '../utils/httpClient';

export function getProducts() {
  return client.get<Product[]>('/products.json');
}

export function getHotPriceProducts(products: Product[]) {
  const hotProducts = [...products].sort((productA, productB) => {
    const discount1 = productA.fullPrice - productA.price;
    const discount2 = productB.fullPrice - productB.price;

    return discount2 - discount1;
  });

  return hotProducts.slice(0, 8);
}

export function getBrandNewProducts(products: Product[]) {
  return [...products].sort((productA, productB) => productB.price - productA.price).slice(0, 8);
}

export function getPhones(products: Product[]) {
  return products.filter(product => product.category === ProductCategory.Phone);
}

export function getTablets(products: Product[]) {
  return products.filter(product => product.category === ProductCategory.Tablet);
}

export function getAccessories(products: Product[]) {
  return products.filter(product => product.category === ProductCategory.Accessory);
}

export function getSuggestedProducts(products: Product[]) {
  const randomList = [...products];

  for (let i = randomList.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
  }

  return randomList.slice(0, 8);
}
