type DataObj = { [key: string]: string };

export interface ProdcutDetails {
  images: string[],
  name: string,
  display: DataObj,
  camera: DataObj,
  battery: DataObj,
  description: string,
  id: string,
}
