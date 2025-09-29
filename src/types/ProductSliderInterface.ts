/* eslint-disable max-len */
import { PhoneDetails } from '../modules/ProductDetails/interfaces/PhoneDetailsInterface';

export interface ProductSliderInterface {
  title: string;
  showOldPrice?: boolean;
  limit?: number;
  products: PhoneDetails[];
}
