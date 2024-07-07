import { client } from '../helpers/fetchClient';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/productDetail';

export const LOCAL_URL = './';

export const getProduct = () => {
  return client.get<Product[]>('api/products.json');
};

export const getProductDetails = (category: Category, productId: string) => {
  return client
    .get<ProductDetails[]>(`api/${category}.json`)
    .then(products => products.find(item => item.id === productId));
};
