import { ProductType } from './ProductType';

export type ProductCardType = ProductType & {
  inBag: boolean;
  inFavourite: boolean;
};
