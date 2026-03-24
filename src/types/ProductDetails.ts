import { BaseDetails } from './BaseDetails';

export type ProductDetails = BaseDetails & {
  camera: string;
  zoom: string;
};
