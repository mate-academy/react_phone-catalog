import { CategoryType } from "../enums/CategoryType";
import { IDescription } from "./Description.interface";

export interface IProductDetails {
  id: string,
  category: CategoryType,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  color: string,
  images: string[],
  description: IDescription[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
}