type Description = {
  title: string,
  text: Array<string>,
};

export type ProductDetails = {
  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: Array<string>,
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: Array<string>,
  color: string,
  images: Array<string>,
  description: Array<Description>
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: Array<string>,
};
