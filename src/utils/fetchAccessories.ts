import accessories from '../../public/api/accessories.json';
import { Accessory } from '../types/accessorie';

export function fetchAccessories(): Accessory[] {
  return accessories as Accessory[];
}
