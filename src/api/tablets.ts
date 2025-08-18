import { client } from '../shared/utils/fetchProdacts';
import { ProductsInfo } from '../shared/types/ProductsInfo';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getTablets = () => {
  return client.get<ProductsInfo[]>(
    '/react_phone-catalog/public/api/tablets.json',
  );
};

export const getTabletById = (id: string) => {
  return wait(300)
    .then(() => getTablets())
    .then(tablets => tablets.find(tablet => tablet.id === id) || null);
};
