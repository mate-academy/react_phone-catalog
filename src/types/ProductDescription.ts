import { Capacity } from './Capacity';
import { Category } from './Category';
import { Color } from './Color';
import { Description } from './Description';
import { Model } from './Model';
import { Ram } from './Ram';

export interface ProductDescription {
  id: number;
  namespaceId: string;
  name: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: Ram;
  camera: string;
  colors: Color[];
  capacities: Capacity[];
  models: Model[];
  description: Description[];
  year: number;
  category: Category.Phones | Category.Tablets;
}
