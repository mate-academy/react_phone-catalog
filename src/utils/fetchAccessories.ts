import { getAccessories } from './getData';
import { Accessory } from '../types/Accessory';

export const fetchAccessories = async (): Promise<Accessory[]> => {
  return getAccessories();
}; 