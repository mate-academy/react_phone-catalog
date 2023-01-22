type Desc = { [key: string]: string | string[] }[];

export interface ProdcutDetails {
  screen: string,
  resolution: string,
  images: string[],
  name: string,
  description: Desc,
  camera: string,
  id: string,
  ram: string,
  capacity: string,
  capacityAvailable: string[],
  zoom: string,
  colorsAvailable: string[],
  color: string,
}
