import { CategoryType } from "../enums/CategoryType";

export interface IProductCard {
  id: number,
  category: CategoryType,
  itemId: string,
  name: string,
  capacity: string,
  fullPrice: number,
  price: number,
  color: string,
  image: string,
  screen: string,
  ram: string,
  year: number,
}
