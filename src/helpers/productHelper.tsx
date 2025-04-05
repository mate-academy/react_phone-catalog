import { Product } from '../types/Product';
import { ProductDetailed } from '../types/ProductDetailed';
import { getData } from '../utils/fetchClient';

export const getProductsByCategory = (category: string) => {
  return getData<Product[]>('products.json').then(products =>
    products.filter(product => product.category === category),
  );
};

export const getProductById = (category: string, productId: string) => {
  return getData<ProductDetailed[]>(`${category}.json`).then(products =>
    products.find(product => product.id === productId),
  );
};

export const getProductsByNamespaceId = (
  category: string,
  namespaceId: string,
) => {
  return getData<ProductDetailed[]>(`${category}.json`).then(products =>
    products.filter(product => product.namespaceId === namespaceId),
  );
};

// export const getSuggestedProductsByCategory = (category: string) => {
//   return getData<Product[]>();
// };
