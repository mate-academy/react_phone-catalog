import {
  Accessory,
  Phone,
  ProductDetailsWithCamera,
  Tablet,
} from '../interfaces/Product';

export const hasCamera = (
  product: Phone | Tablet | Accessory,
): product is ProductDetailsWithCamera => {
  return 'camera' in product && 'zoom' in product;
};
