export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number | null;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export type CartProduct = Product & {
  quantity: number;
};
