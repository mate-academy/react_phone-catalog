export type Product = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories',
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  year: number;
  capacity: string;
  color: string;
};
