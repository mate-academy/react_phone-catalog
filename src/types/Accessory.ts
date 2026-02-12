import { GoodBase } from './GoodBase';
import { ProductCategory } from './ProductCategory';

export type Accessory = GoodBase & {
  category: ProductCategory.accessories;
  cell: string[];
};
