import { PagesPath } from './PagesPath';
import { ProductCategory } from './ProductGeneral';

export type HexColor = `#${string}`;

export type Category = {
  id: ProductCategory;
  title: string;
  link: PagesPath;
  img: string;
  bgc?: HexColor;
};
