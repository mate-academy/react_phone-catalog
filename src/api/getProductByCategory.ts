import { Goods } from '../types/Goods';
import { getData } from './getData';

export const getProductByCategory = async (
  category: string,
): Promise<Goods[]> => {
  const phones = await getData<Goods[]>(`api/${category}.json`);

  return phones;
};
