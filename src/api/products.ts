import { Product, ProductDetails } from '../types/Product';

const BASE_URL = '/api';

function getData<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`).then(response => response.json());
}

export function getProducts(category: string) {
  return getData<Product[]>(`/${category}.json`);
}

export function getProductDetails(productId: string) {
  return Promise.all([
    getData<ProductDetails[]>('/phones.json'),
    getData<ProductDetails[]>('/tablets.json'),
    getData<ProductDetails[]>('/accessories.json'),
  ]).then(([phones, tablets, accessories]) => {
    const allProducts = [...phones, ...tablets, ...accessories];

    return {
      product: allProducts.find(product => product.id === productId),
      allProducts,
    };
  });
}

export function getSuggestedProducts(category: string) {
  return getProducts('products').then(products => {
    const sameCategory = products.filter(
      product => product.category === category,
    );
    const withoutDiscount = sameCategory.filter(
      product => product.price === product.fullPrice,
    );

    const pool = withoutDiscount.length >= 4 ? withoutDiscount : sameCategory;

    return [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
  });
}

export function getHotProducts() {
  return getProducts('products').then(products => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);
  });
}

export function getBrandNewProducts() {
  return getProducts('products').then(products => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 10);
  });
}
