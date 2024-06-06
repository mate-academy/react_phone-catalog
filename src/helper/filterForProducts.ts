import { IProduct } from '../types';

export const filterForProducts = (data: IProduct[], category: string) => {
  return data.filter((item) => item.category === category);
};
