import { Category } from '../Types/Category';
import { Product } from '../Types/Product';
import { ProductDetails } from '../Types/ProductDetails';
import { client } from '../helpers/fetchClient';

export const LOCAL_URL = '/react_phone-catalog';
// export const LOCAL_URL = './';

export const getProducts = () => {
  return client.get<Product[]>('api/products.json');
};

export const getProductDetails = (category: Category, productId: string) => {
  return client
    .get<ProductDetails[]>(`api/${category}.json`)
    .then(products => products.find(item => item.id === productId));
};
