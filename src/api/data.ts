import { Phones } from '../types/Phones';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { client, client2 } from '../utils/fetchData';

export const getData = () => {
  return client.get<Phones[]>();
};

// export const getDataDetails = () => {
//   return client.get<ProductDetailsType[]>();
// };

export const getProductDetails = (productId: string) => {
  return client2.get<ProductDetailsType>(productId);
};
