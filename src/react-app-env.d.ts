export interface Product {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string
}

export interface RootState {
  favorits: string[];
  selectedcart: Product[];
}
