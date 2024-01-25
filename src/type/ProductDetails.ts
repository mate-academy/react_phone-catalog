export interface ProductDetails {
  id: string,
  capacityAvailable: string[],
  namespaceId: string,
  name: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  images: string[],
  description: {
    title: string;
    text: string[];
  }[];
  resolution: string,
  processor: string,
  camera: string,
  zoom: string,
  cell: string[],
}
