export interface ProductCardType {
  id: number | string;
  category: string;
  itemId: string;

  name: string;

  fullPrice: number;
  price: number;

  screen?: string;
  capacity?: string;
  ram?: string;

  image: string;
}
