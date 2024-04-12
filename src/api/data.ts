import { Phones } from '../types/Phones';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { Products } from '../types/Products';
import { client, client2, clientForAll } from '../utils/fetchData';

export const getData = () => {
  return client.get<Phones[]>();
};

// export const getDataDetails = () => {
//   return client.get<ProductDetailsType[]>();
// };

export const getProductDetails = (productId: string) => {
  return client2.get<ProductDetailsType>(productId);
};

export const getAllData = (products: string) => {
  return clientForAll.get<Products[]>(products);
};

export const getAllDetails = (product: string) => {
  return clientForAll.get<ProductDetailsType[]>(product);
};

// export const getTabletsData = () => {
//   return client3.get<Tablets[]>();
// };
