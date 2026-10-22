import type { Product } from '../types/Product';

export const PRODUCT_SPECIFICATIONS = [
  'screen',
  'resolution',
  'processor',
  'ram',
] as const satisfies readonly (keyof Product)[];

export const PRODUCT_SPECIFICATIONS_CARD = [
  'screen',
  'capacity',
  'ram',
] as const satisfies readonly (keyof Product)[];

export const PRODUCT_SPECIFICATIONS_TECH = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
] as const satisfies readonly (keyof Product)[];
