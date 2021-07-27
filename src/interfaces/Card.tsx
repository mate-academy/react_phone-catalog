export interface Card {
  age: number;
  id: string;
  snippet: string,
  type: "tablet" | "phone" | "accessories";
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  screen: string;
  capacity: string;
  ram: string;
}
