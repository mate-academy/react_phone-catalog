import { Tablets } from '../types/Tablets';
import { client } from '../utils/fetchClient';

export const getTablets = () => {
  return client.get<Tablets[]>('/tablets.json');
};
