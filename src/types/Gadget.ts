export interface Description {
  title: string;
  text: string[];
}

export interface Gadget {
  id: string | number;
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
  description: [];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

export interface Phone extends Gadget {
  camera: string;
  zoom: string;
}
export type Accessories = Gadget;
export type Tablet = Phone;
export type TypeGadget = Phone | Tablet | Accessories;
