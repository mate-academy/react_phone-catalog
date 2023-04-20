import { Color } from './Color';
import { Capacity } from './Capacity';

export interface Details {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: Capacity[],
  capacity: Capacity,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: [keyof typeof Color],
  color: string,
  images: string[],
  description: Description[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
}

interface Description {
  title: string,
  text: string[],
}
