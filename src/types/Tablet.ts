import { GoodBase } from './GoodBase';
import { ProductCategory } from './ProductCategory';

export type Tablet = GoodBase & {
  category: ProductCategory.tablets;
  camera: string;
  zoom: string;
  cell: string[];
};
