import { Gadget } from './Gadjets';

export interface Product {
  type: Gadget,
  price: number,
  discount: number,
  age: number,
  id: string,
  imageUrl: string,
  name: string,
  screen: string,
  capacity: string,
  ram: string,
}
