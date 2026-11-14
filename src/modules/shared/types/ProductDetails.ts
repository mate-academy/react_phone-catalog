export interface DescriptionBlock {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
