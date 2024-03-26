export type Type = 'phones' | 'tablets' | 'accessories';

export interface Product {
  id: string,
  category: Type,
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
  count?: number,
}
