import { Product } from './types/Product';
import { client } from './helpers/fetchClient';
import { Categories } from './types/Categories';
import { ProductDetails } from './types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductsByCategory = (category: Categories) => {
  return getProducts().then(products =>
    products.filter(product => product.category === category),
  );
};

export const getProductDetails = (
  productId: string | undefined,
  categoty: string | undefined,
) => {
  return client
    .get<ProductDetails[]>(`/${categoty}.json`)
    .then(details => details.find(item => item.id === productId));
};
