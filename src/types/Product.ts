import { Category } from './Category';
import { Ram } from './Ram';
import { Capacity } from './Capacity';
import { Color } from './Color';

export interface Product {
  namespaceId: string;
  productId: string;
  category: Category.Phones | Category.Tablets;
  name: string;
  fullPrice: number;
  discountPrice: number;
  screen: string;
  capacity: Capacity;
  color: Color;
  ram: Ram;
  year: number;
  count: number;
}
