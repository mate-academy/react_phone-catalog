import type { ProductDetails } from './product';

export interface Tablet extends ProductDetails {
  category: 'tablets';
  camera: string;
  zoom: string;
}
