import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = 'api/products.json';

export function getProducts(): Promise<Product[]> {
  return fetch(BASE_URL).then(response => {
    if (!response) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  });
}

const fetchFromCategory = (category: string, productId: string) => {
  const url = `api/${category}.json`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((products: ProductDetails[]) => {
      const found = products.find(p => p.id === productId);

      if (!found) {
        throw new Error();
      }

      return found;
    });
};

export function getProductDetails(productId: string): Promise<ProductDetails> {
  return fetchFromCategory('phones', productId)
    .catch(() => {
      return fetchFromCategory('tablets', productId);
    })
    .catch(() => {
      return fetchFromCategory('accessories', productId);
    });
}

export function getSuggestedProducts(): Promise<Product[]> {
  return getProducts().then(products => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 8);
  });
}
