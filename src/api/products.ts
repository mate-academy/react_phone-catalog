import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

type ProductWithDetails = {
  product: Product;
  details: ProductDetails;
};

export const getProducts = (): Promise<Product[]> => {
  return fetch('api/products.json').then(response => response.json());
};

export const getProductDetails = (
  productId: string,
): Promise<ProductWithDetails | undefined> => {
  return getProducts().then(products => {
    const product = products.find(prod => prod.itemId === productId);

    if (!product) {
      return undefined;
    }

    return fetch(`api/${product.category}.json`)
      .then(response => response.json())
      .then((data: ProductDetails[]) => {
        const details = data.find(item => item.id === productId);

        return details ? { product, details } : undefined;
      });
  });
};

export const getSuggestedProducts = (): Promise<Product[]> => {
  return getProducts().then(data => {
    return data
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  });
};
