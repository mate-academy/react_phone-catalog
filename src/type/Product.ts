import { Color } from './Color';

export type Product = {
  quantity: number;
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: Color;
  ram: string;
  year: number;
  image: string;
};
