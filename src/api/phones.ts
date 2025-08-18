import { client } from '../shared/utils/fetchProdacts';
import { ProductsInfo } from '../shared/types/ProductsInfo';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPhones = () => {
  return client.get<ProductsInfo[]>(
    '/react_phone-catalog/public/api/phones.json',
  );
};

export const getPhoneById = (phoneId: string) => {
  return wait(300)
    .then(() => getPhones())
    .then(
      (phones: ProductsInfo[]) =>
        phones.find(phone => phone.id === phoneId) || null,
    );
};
