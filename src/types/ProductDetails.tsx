interface Description {
  title: string;
  text: string[];
}

export interface ProductDetails {
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
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

export interface Accessory extends ProductDetails {}

export interface Phone extends ProductDetails {
  camera: string;
  zoom: string;
}

export interface Tablet extends ProductDetails {
  camera: string;
  zoom: string;
}
