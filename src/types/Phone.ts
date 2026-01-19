import { GoodBase } from './GoodBase';
import { ProductCategory } from './ProductCategory';

export type Phone = GoodBase & {
  category: ProductCategory.phones;
  camera: string;
  zoom: string;
  cell: string[];
};
