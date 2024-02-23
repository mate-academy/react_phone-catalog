import { ProductType } from './productType.type';

export interface IProduct {
  age: number,
  capacity: string,
  discount: number,
  id: string,
  imageUrl: string,
  name: string,
  price: number,
  ram: string,
  screen: string,
  snippet: string,
  type: ProductType,
}
