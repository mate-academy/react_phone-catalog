import {
  catalogueValidIDs,
  GlobalValidNameSpaceIDs,
  Cameras,
  Capacity,
  Cells,
  Colors,
  Description,
  PhoneZoom,
  Processors,
  Ram,
  Resolutions,
  Screens,
} from '@server/static';
import { CategoryParams } from '.';

interface Base {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: Screens;
  capacity: Capacity;
  color: Colors;
  ram: Ram;
  images: string[];
}

interface BaseProduct extends Base {
  key: (typeof catalogueValidIDs)[number];
  year: number;
  category: Omit<CategoryParams, CategoryParams.ALL>;
}

interface Product extends Base {
  namespaceId: GlobalValidNameSpaceIDs;
  capacityAvailable: Capacity[];
  colorsAvailable: Colors[];
  description: Description[];
  resolution: Resolutions;
  processor: Processors;
  cell?: Cells[];
  camera?: Cameras;
  zoom?: PhoneZoom;
}

interface BannerData {
  src: string;
  alt: string;
  href: string;
}

interface ErrorObject {
  status: false;
  message: string;
}

interface ValidResponse {
  status: true;
  data: BaseProduct[] | Product[] | BannerData[];
  currentPage?: number;
  pages?: number;
}

export {
  type BaseProduct,
  type Product,
  type BannerData,
  type ErrorObject,
  type ValidResponse,
};
