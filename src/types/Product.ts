export interface Product {
  name: string,
  id: string,
  image: string,
  phoneId: string,
  price: number,
  ram: string,
  itemId: string,
  category: string,
  color: string,
  screen: string,
  capacity: string,
  year: number,
  fullPrice: number,
}

export enum ProductType {
  Phone = 'phones',
  Tablet = 'tablets',
  Accessory = 'accessory',
}
