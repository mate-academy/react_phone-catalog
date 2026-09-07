interface DescriptionItem {
  title: string;
  text: string[];
}

export interface Accessoirs {
  id: string;
  category: 'phones' | 'accessories' | 'tablets';
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
}
