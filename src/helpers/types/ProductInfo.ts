export type ProductInfo = {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: string,
  priceDiscount: string,
  additionalFeatures: string,
  colorsAvailable: string[],
  color: string,
  images: string[],
  description: {
    title: string,
    text: string[]
  }[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
};
