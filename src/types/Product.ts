export type ProductType = 'phones' | 'tablet' | 'accessory';

export interface Product {
  category: ProductType,
  fullPrice: number,
  price: number,
  age: number,
  id: string,
  itemId: string,
  image: string,
  color: string,
  name: string,
  snippet: string,
  screen: string,
  capacity: string,
  ram: string,
  year: number,
}
