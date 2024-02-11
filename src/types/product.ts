export type ProductName = 'phone' | 'tablet' | 'accessory';

export type Product = {
  age: number,
  type: ProductName,
  id: string,
  imageUrl: string
  name: string
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string
};
