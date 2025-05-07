import { ProductDetails } from '../../shared/types';
import { fetchData } from '../../shared/utils/fetchData';

export const getProducts = (category: string): Promise<ProductDetails[]> =>
  fetchData(`./api/${category}.json`);
