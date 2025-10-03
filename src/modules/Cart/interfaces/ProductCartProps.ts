/* eslint-disable max-len */
import { PhoneDetails } from '../../ProductDetails/interfaces/PhoneDetailsInterface';

export interface ProductCartProps {
  product: PhoneDetails;
  category: 'phones' | 'tablets' | 'accessories';
}
