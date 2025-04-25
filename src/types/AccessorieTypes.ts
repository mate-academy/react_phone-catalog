export interface AccessoryDescription {
  title: string;
  text: string[];
}

export interface Accessory {
  id: string;
  category: 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: AccessoryDescription[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  cell?: string[];
}
