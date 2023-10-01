export interface Product {
  id: string,
  name: string,
  age: number,
  type: 'phone' | 'tablet' | 'accessory';
  imageUrl: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
}
