interface DescriptionItem {
  title: string;
  text: string[];
}

export interface Tables {
  id: string;
  category: 'tablets';
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
  cell: string[];
  camera: string;
  zoom: string;
}
