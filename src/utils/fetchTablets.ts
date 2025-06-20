import { getTablets } from './getData';
import { Tablet } from '../types/Tablet';

export const fetchTablets = async (): Promise<Tablet[]> => {
  return getTablets();
}; 