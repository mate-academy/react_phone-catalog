type Capacity = '32GB' | '64GB' | '128GB' | '256GB' | '512GB' | '1TB';
type Color = 'black' | 'green' | 'yellow' | 'white' | 'purple' | 'red' | 'gold';
// type Cell = 'GPRS' | 'EDGE' | 'WCDMA' | 'UMTS' | 'HSPA' | 'LTE';
export type Category = 'phones' | 'tablets' | 'accessories';

export type Product = {
  id: number;
  category: 'accessories' | 'tablets' | 'phones';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: Capacity;
  color: Color;
  ram: string;
  year: number;
  image: string;
};


type ProductCategory = 'phones' | 'tablets' | 'accessories';

type ProductDescription = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];
  description: ProductDescription[];
  descriptionUa: ProductDescription[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];

  camera?: string;
  zoom?: string;
};


export type ProductInCart = {
  id: string,
  count: number;
}
