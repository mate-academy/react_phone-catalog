export interface Product {
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
}

export interface ProductSchema {
  products: Product[];
  isLoading: boolean;
  error: boolean;
  _inited: boolean;
}