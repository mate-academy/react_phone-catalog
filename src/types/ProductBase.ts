export interface ProductBase {
  id: number;
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
  color:string | undefined;
}
