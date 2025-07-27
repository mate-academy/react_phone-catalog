import type { Product } from './Product';
import type { Phone } from './Phone';
import type { Tablet } from './Tablet';
import type { Accessory } from './Accessory';

export type ProductWithDetails = Product & {
  details: Phone | Tablet | Accessory | null;
};
