export interface Product {
  age: number,
  type: string,
  carrier: string,
  id: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
}

export interface ProductState {
  products: Product[];
  // Додайте інші поля стану для редуктора продуктів
}
