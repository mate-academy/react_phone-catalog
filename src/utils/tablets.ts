import axios from 'axios';
import { Tablet } from '../types/Tablet';

export const fetchTablets = async (): Promise<Tablet[]> => {
  const res = await axios.get<Tablet[]>('/api/tablets.json');
  return res.data;
};
