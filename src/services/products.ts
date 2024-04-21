import { Product } from '../types/Product';
import { Categories } from '../types/Categories';
import { ProductDetails } from '../types/ProductDetails';

export function getProducts(): Promise<Product[]> {
  return fetch('/_new/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Can not load...');
      }

      return response.json();
    });
}

export function getPhones(): Promise<Product[]> {
  return getProducts()
    .then(products => {
      return products
        .filter(product => product.category === Categories.phones);
    });
}

export function getTablets(): Promise<Product[]> {
  return getProducts()
    .then(products => {
      return products
        .filter(product => product.category === Categories.tablets);
    });
}

export function getAccessories(): Promise<Product[]> {
  return getProducts()
    .then(products => {
      return products
        .filter(product => product.category === Categories.tablets);
    });
}

export function getSuggestedProducts(): Promise<Product[]> {
  return getProducts()
    .then(products => {
      const sortedProducts = products.sort(() => {
        return (Math.random() > 0.5 ? 1 : -1);
      });

      return sortedProducts;
    });
}

export function getHotPriceProducts() {
  return getProducts()
    .then(products => {
      return products
        .sort((p1, p2) => {
          return (p2.fullPrice - p2.price) - (p1.fullPrice - p1.price);
        })
        .slice(0, 20);
    });
}

export function getBrandNewProducts() {
  return getProducts()
    .then(products => {
      return products
        .sort((p1, p2) => {
          return p2.year - p1.year;
        })
        .sort((p1, p2) => {
          return p2.price - p1.price;
        })
        .slice(0, 20);
    });
}

export function getProductById(id: string) {
  return getProducts()
    .then(products => products.find(product => product.itemId === id));
}

export function getProductDetailsById(id: string): Promise<ProductDetails> {
  return fetch(`/_new/products/${id}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Can not load...');
      }

      return response.json();
    });
}
