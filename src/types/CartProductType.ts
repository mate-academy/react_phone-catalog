import { ProductType } from './product';

export type CartProductType = ProductType & {
  quantity: number;
};
