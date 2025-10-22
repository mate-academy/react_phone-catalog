import axios from 'axios';
import { Accessory } from '../types/Accessory';

export const fetchAccessories = async (): Promise<Accessory[]> => {
  const res = await axios.get<Accessory[]>('../api/accessories.json');
  return res.data;
};
