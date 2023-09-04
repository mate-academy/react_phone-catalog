export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

export type Product = {
  age: number;
  id: string;
  type: ProductType;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string
  capacity: string;
  ram: string;
};
