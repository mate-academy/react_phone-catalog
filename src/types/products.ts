export interface Product {
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
  images?: string[];
  priceRegular?: string;
  priceDiscount?: string;
}

export interface ProductList extends Product {
  quantity: number;
}
