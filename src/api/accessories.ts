import { client } from '../shared/utils/fetchProdacts';
import { ProductsInfo } from '../shared/types/ProductsInfo';

export const getAccessories = () => {
  return client.get<ProductsInfo[]>('/api/accessories.json');
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAccessoryById = (accessoryId: string) => {
  return wait(300)
    .then(() => getAccessories())
    .then(
      (accessories: ProductsInfo[]) =>
        accessories.find((acc: ProductsInfo) => acc.id === accessoryId) || null,
    );
};
