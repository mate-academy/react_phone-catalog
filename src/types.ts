export type Category = 'phones' | 'tablets' | 'accessories';
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  fullPrice: number;
  year: number;
  image: string;
  colors: string[];
  capacities: string[];
  description: string;
};
export type CartItem = { product: Product; quantity: number };
