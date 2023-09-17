export enum ProductType {
  PHONES = 'phones',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

export interface Product {
  id: string,
  category: ProductType,
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
  image: string
}
