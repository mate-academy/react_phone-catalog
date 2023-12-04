import { ColorsHex } from './ColorsHex';

export interface ProductDetailsType {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: (keyof ColorsHex)[],
  color: string,
  images: string[],
  description: {
    title: string,
    text: string[],
  }[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
}
