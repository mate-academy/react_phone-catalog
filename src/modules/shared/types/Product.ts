export interface Product {
  id: string;
  category?: string;
  itemId?: string;
  name: string;
  fullPrice?: number;
  price: number;
  screen: string;
  capacity: string;
  color?: string;
  ram: string;
  year?: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type RawProductFromApi = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};
