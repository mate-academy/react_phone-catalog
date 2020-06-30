// / <reference types="react-scripts" />
interface Good extends IIndexable {
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

interface CartGood {
  good: Good;
  quantity: number;
}

interface IIndexable {
  [key: string]: any;
}
