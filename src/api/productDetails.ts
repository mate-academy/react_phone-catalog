import { ProductDetails } from '../types/ProductDetails';
import { getProducts } from './products';

export const getCategoryItems = (
  category: string,
): Promise<ProductDetails[]> => {
  return fetch(`api/${category}.json`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to load product');
    }

    return response.json();
  });
};

export const getProductDetails = (productId: string) => {
  return getProducts().then(products => {
    const product = products.find(item => item.itemId === productId);

    if (!product) {
      return undefined;
    }

    return getCategoryItems(product.category).then(items => {
      const details = items.find(item => item.id === productId);

      if (!details) {
        return undefined;
      }

      return { product, details };
    });
  });
};
