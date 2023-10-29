import { DescriptionType } from './DescriptionType';

export interface ProductDescription {
  camera: string,
  capacity: string,
  capacityAvailable: string[],
  cell: string[],
  color: string,
  colorsAvailable: string[],
  description: DescriptionType[],
  id: string,
  images: string[],
  name: string,
  namespaceId: string,
  priceDiscount: number,
  priceRegular: number,
  processor: number,
  ram: string,
  resolution: string,
  screen: string,
  zoom: string,
}
