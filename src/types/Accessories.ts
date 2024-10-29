export interface ProductDescription {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { text: string[]}[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];

}

