import {
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
import { ServerCategory } from '.';

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
  key: number;
  year: number;
  category: ServerCategory;
}

interface Product extends Base {
  category: ServerCategory;
  namespaceId: string;
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
  id: number;
  src: string;
  alt: string;
  ariaLabel: string;
  href: string;
}

interface ErrorObject {
  status: false;
  message: string;
}

interface ValidResponse {
  status: true;
  items: BaseProduct[] | Product[] | BannerData[] | number | null;
  currentPage?: number;
  pages?: number;
}

enum Status {
  ERROR = 'error',
  SUCCESS = 'success',
}

export {
  type BaseProduct,
  type Product,
  type BannerData,
  type ErrorObject,
  type ValidResponse,
  Status,
};
