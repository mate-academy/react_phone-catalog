export interface Description {
  title: string;
  text: string[];
}

export interface BaseGadget {
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

export type Accessory = BaseGadget;

export interface Phone extends BaseGadget {
  camera: string;
  zoom: string;
}

export type Tablet = Phone;

export type GadgetType = Phone | Tablet | Accessory;
