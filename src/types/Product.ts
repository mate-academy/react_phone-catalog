export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image?: string;
  images?: string[];
};
