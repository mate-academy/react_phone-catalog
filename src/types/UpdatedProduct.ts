import { Categories } from './Categories';

export type UpdatedProduct = {
  id: number;
  category: Categories;
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
  quantity: number;
};
