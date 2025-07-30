type GadgetDescription = {
  title: string;
  text: string[];
};

export type Gadget = {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: GadgetDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string;
  zoom?: string;
};
