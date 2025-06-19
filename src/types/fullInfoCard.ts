export interface FullCard {
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
  description: Description;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export type Description = {
  en: DescriptionPart[];
  uk: DescriptionPart[];
};

export type DescriptionPart = {
  title: string;
  text: string[];
};
