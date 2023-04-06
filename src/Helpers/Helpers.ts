import { Product } from '../Types/Product';
import { client } from './fetchProd';
import { ProductDetails } from '../Types/ProductDeteils';
// import { useSearchParams } from 'react-router-dom';

// export const querySort = (products: Product[]) => {
//   const [searchParams] = useSearchParams();

//   const query = searchParams.get('query') || '';
//   console.log(query);

//   return products.filter((product: Product) => product.name.toLowerCase().includes(query.toLowerCase()));
// }

export const getProducts = () => {
  return client.get<Product[]>('_new/products.json');
};

export const getPoductsByCategory = (data: Product[], category: string) => {
  return data.filter((el) => el.category === category);
};

// export const getProductsAccessories = () => {
//   return client.get<never[]>('_new/accessories.json');
// };

export const getProductById = (productId: string | null) => {
  return client.get<ProductDetails>(`/_new/products/${productId}.json`);
};
