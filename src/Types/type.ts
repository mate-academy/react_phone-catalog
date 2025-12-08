export type Product = {
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

export type Phone = {
  id: string;
  category: string;
  name: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  ram: string;
  screen: string;
  color: string;
};

export type SortType = '' | 'expensive' | 'cheaper' | 'discount';
