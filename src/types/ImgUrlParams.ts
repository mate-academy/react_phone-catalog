import { Category } from './Category';
import { Color } from './Color';

export type ImgUrlParams = {
  namespaceId: string;
  category: Category.Phones | Category.Tablets;
  color: Color;
  number: number;
};
