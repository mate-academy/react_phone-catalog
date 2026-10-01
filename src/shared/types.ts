export type Category = 'phones' | 'tablets' | 'accessories';

export type Product = {
  id: string;
  category: Category;
  namespaceId: string;

  name: string;

  priceRegular: number;
  priceDiscount: number;

  year: number;

  capacity: string;
  capacityAvailable: string[];

  color: string;
  colorsAvailable: string[];

  images: string[];

  description: string;

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};
