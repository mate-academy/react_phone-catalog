type Capacity = '32GB' | '64GB' | '128GB' | '256GB' | '512GB';
type Color = 'black' | 'green' | 'yellow' | 'white' | 'purple' | 'red';
type Cell = 'GPRS' | 'EDGE' | 'WCDMA' | 'UMTS' | 'HSPA' | 'LTE';

type Description = {
  title: string;
  text: string[];
};

export type Phone = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: Capacity[];
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Color[];
  color: Color;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: Cell[];
};

export type Product = {
  id: number;
  category: string;
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
