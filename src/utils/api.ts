import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json().then(obj => {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Invalid response format: Expected an object');
    }

    return obj.data as T;
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchSpecificProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json().then(obj => {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Invalid response format: Expected an object');
    }

    return obj as T;
  });
}

export function fetchProductsWithDelay<T>(
  url: string,
  delay: number,
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchProducts<T>(url).then(resolve).catch(reject);
    }, delay);
  });
}

export function getAvailableProductsByCategory(
  category: string,
): Promise<ProductDetails[]> {
  return fetchProducts<ProductDetails[]>(
    `https://localhost:4000/${category}`,
    // `./api/${category}.json`,
  );
}

export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('https://localhost:4000/products');
}
// fetchProducts
// 'https://localhost:4000/products'
// './api/products.json'

export function getSpecificProducts(
  productsType: string,
): Promise<ProductDetails[]> {
  const specificProducts = fetchProducts<ProductDetails[]>(
    `https://localhost:4000/${productsType}`,
    // `./api/${productsType}.json`,
  );

  return specificProducts;
  // return fetchProducts<ProductDetails[]>(
  //  `https://localhost:4000/${productsType}`,
  // );
}
