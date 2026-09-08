export interface DetailedBaseProduct {
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
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

interface CameraDetails {
  camera: string;
  zoom: string;
}

export interface PhoneDetails extends DetailedBaseProduct, CameraDetails {
  category: 'phones';
}

export interface TabletDetails extends DetailedBaseProduct, CameraDetails {
  category: 'tablets';
}

export interface AccessoryDetails extends DetailedBaseProduct {
  category: 'accessories';
}

export type AnyDetailedProduct =
  | PhoneDetails
  | TabletDetails
  | AccessoryDetails;
