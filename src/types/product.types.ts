export interface ProductType {
  id: string;
  category: string;
  productId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;

  priceDiscount: number;
  priceRegular: number;

  images: string[];
}
