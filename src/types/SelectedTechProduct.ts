export interface SelectedTechProduct {
  id: string,
  namespaceId: string,
  name: string,
  capacity: string,
  capacityAvailable: string[],
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
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

type Description = {
  title: string,
  text: string[],
};
