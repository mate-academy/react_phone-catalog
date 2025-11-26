export interface DescriptionDevice {
  title: string;
  text: string[];
}

export interface Device {
  id: string;
  name: string;
  category: string;
  color: string;
  capacity: string;
  colorsAvailable: string[];
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  quantity: number;
  namespaceId?: string;

  description: DescriptionDevice[];
}
