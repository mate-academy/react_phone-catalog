import { ProductsCategories } from '../../enums';

export interface ProductType {
  id: string,
  category: ProductsCategories,
  phoneId: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string,
}
