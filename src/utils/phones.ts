import axios from 'axios';
import { Phone } from '../types/Phone';

export const fetchPhones = async (): Promise<Phone[]> => {
  const res = await axios.get<Phone[]>('api/phones.json');
  return res.data;
};
