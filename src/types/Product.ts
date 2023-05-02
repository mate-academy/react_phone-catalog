export enum ProductTypes {
  phone = 'phone',
  tablet = 'tablet',
  accessory = 'accessory',
}

export interface Product {
  age: number;
  id: string;
  type: ProductTypes;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}
