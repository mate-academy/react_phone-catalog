import type { ProductDetails } from './product';

export interface Accessory extends ProductDetails {
  category: 'accessories';
}
