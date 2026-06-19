export type BaseProduct = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  name: string;

  priceRegular: number;
  priceDiscount: number;
  images: string[];

  screen: string;
  capacity: string;
  ram: string;
};
