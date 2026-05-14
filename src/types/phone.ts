import type { ProductDetails } from './product';

export interface Phone extends ProductDetails {
  category: 'phones';
  camera: string;
  zoom: string;
}
