export interface AccessoryDescription {}

export interface Accessory {
  id: string;
  category: 'accessories';
  namespaceId: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string | undefined;
  itemId: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  description: {
    title: string[];
    text: string[];
  };
  color: string;
  images: string[];
  screen?: string;
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  ram?: string;
  cell?: string[];
}
