import { ProductType } from '../enums/ProductType';

export type Product = {
  age: number
  id: string
  type: ProductType
  name: string
  imageUrl: string
  price: number
  discount: number
  discountedPrice: number
  screen: string
  capacity: string
  ram: string
};
