export type ProductSummary = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  year: number;
  image: string;
  quantity: number;
  [key: string]: string | number;
};
