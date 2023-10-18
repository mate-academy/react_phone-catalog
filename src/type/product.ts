export interface Product {
  age: number,
  type: 'phone' | 'tablet' | 'accessories',
  id: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string | null,
  ram: string | null,
}

export enum TypeProduct {
  Phone = 'phone',
  Tablet = 'tablet',
  Accessories = 'accessories',
}
