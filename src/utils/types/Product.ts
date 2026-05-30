import { Categories } from './Categories';

export interface Product {
  id?: number;
  category: Categories.PHONES | Categories.TABLETS | Categories.ACCESSORIES;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
