export interface CartProduct {
  id: string;
  name: string;
  price: number;
  priceDiscount?: number;
  images: string[];
  category: string;
  capacity: string;
  color: string;
}
