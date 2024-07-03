import { Tablet } from '../types/tablets';
import { client } from '../utils/axiosClient';

export const getTablets = () => {
  return client.get<Tablet[]>('/tablets.json');
};
