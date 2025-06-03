export interface Product {
  id: string | number;
  category: string;
  name: string;
  fullPrice: number;
  price: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  year?: number;
  color?: string;
  image?: string;
  images?: string[];
}
