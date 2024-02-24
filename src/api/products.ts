import { PhoneDetails } from '../types/PhoneDetails';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>();
};

export const getProductByID = (productID : string) => {
  return client.getByID<PhoneDetails>(productID);
};
