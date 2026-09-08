export interface DescriptionItem {
  title: string;
  text: string[];
}

export interface Product {
  id: string;
  category: string;
  itemId: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];

  image: string;
  price: number;
  fullPrice: number;
  year: number;
}
