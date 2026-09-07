export interface ProductBase {
  id: number | string;
  category: string;
  name: string;
  price: number;
  priceDiscount?: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  fullPrice: number;
  itemId: string;
  favouriteKey: string;
  color: string | undefined;
  year: number;
}
