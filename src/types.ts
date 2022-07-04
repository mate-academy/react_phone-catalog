export interface Item {
  age: number;
  capacity: string;
  discount: number;
  imageUrl: string;
  id: string;
  name: string;
  price: number;
  ram: string;
  screen: string;
  snipper: string;
  type: string;
}

export interface CartItem {
  id: string,
  quantity: number;
  product: Item;
}
