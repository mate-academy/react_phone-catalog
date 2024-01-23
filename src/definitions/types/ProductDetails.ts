export interface ProductDetails {
  camera: string,
  capacity: string,
  capacityAvailable: string[],
  cell: string[],
  color: string,
  colorsAvailable: string[],
  description: DescriptionItem[],
  id: string,
  images: string[], 
  name: string,
  namespaceId: string,
  priceDiscount?: number,
  priceRegular: number,
  processor: string,
  ram: string,
  resolution: string,
  screen: string,
  zoom: string,
}

interface DescriptionItem {
  title: string,
  text: string[]
}