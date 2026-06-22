export type Product = {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  capacity?: string;
  fullPrice: number;
  price: number;
  color?: string;
  image: string;
  screen?: string;
  ram?: string;
  year: number;
};
