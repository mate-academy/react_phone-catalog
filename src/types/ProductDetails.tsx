export type ProductDetails = {
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  color: string,
  images: string[],
  description: Array<{ title: string, text: string[] }>,
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
};

export type ProductDetailsTechSpecs = {
  param: 'screen' | 'resolution' | 'processor'
  | 'ram' | 'camera' | 'zoom' | 'cell',
};
