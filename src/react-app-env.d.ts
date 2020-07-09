interface ProductItem {
  [KEY: string]: number | string;
  age: number;
  id: string;
  type: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}
