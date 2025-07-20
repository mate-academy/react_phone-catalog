import type { CapacityOptions, ColorOptions } from '../types/detailedProduct';
import { COLOR_MAP } from './colorMap';

export const ALL_CAPACITIES: CapacityOptions = [
  '8GB',
  '16GB',
  '32GB',
  '64GB',
  '128GB',
  '256GB',
  '512GB',
  '1TB',
  '2TB',
  '38mm',
  '42mm',
  '40mm',
  '44mm',
  '41mm',
  '45mm',
];

export const ALL_COLORS: ColorOptions = Object.keys(COLOR_MAP);
