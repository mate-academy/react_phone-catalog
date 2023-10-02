export enum Type {
  phone = 'phone',
  tablet = 'tablet',
  accessory = 'accessory',
}

export interface Product {
  type: Type,
  imageUrl: string,
  name: string,
  price: number,
  discount: number,
  age: number,
  id: string,
  screen: string,
  capacity: string,
  ram: string,
}
