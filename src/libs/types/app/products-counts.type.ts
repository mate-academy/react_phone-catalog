import { ProductsCategories } from '../../enums';

export type ProductsCountsType = {
  [ProductsCategories.PHONES]: number;
  [ProductsCategories.TABLETS]: number;
  [ProductsCategories.ACCESSORIES]: number;
};
