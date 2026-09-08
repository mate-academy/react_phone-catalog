export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  itemId: string;
  category: string;
  ram: string;
  screen: string;
  capacity: string;
  hasDiscount?: boolean;
}
