export type Product = {
  year?: undefined | number;
  id: string | number;
  category: 'phones' | 'tablets' | 'accessories';
  name: string;
  fullPrice?: number;
  itemId: string;
  price: number;
  capacity?: string;
  color: string;
  image: string;
  images?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};
