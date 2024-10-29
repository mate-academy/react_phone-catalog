export interface Phone {
  id: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  name: string;
  imageUrl: string;
  type: string;
  images: string;
}

interface DescriptionItem {
  title: string;
  text: string[];
}

export type PhoneFromServer = {
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
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  count?: number;
  price?: number;
};
