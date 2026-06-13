export type ProductCardData = {
  id: number | string;
  itemId: string;
  name: string;
  image: string;
  category: string;

  price: number;
  fullPrice?: number;

  screen: string;
  capacity: string;
  ram: string;
};
