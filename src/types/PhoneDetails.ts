import { ProductDetails } from './ProductDetails';

export interface PhoneDetails extends ProductDetails {
  camera: string;
  zoom: string;
}
