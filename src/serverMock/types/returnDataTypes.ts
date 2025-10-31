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
  ServerCategory,
} from '@server/static';

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
  srcWide: string;
  srcSquare: string;
  alt: string;
  ariaLabel: string;
  href: string;
}
enum Status {
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ErrorObject {
  status: Status.ERROR;
  statusCode: number;
  error: string;
  message: string;
}

interface CatalogueResponse {
  items: BaseProduct[] | Product | BannerData[] | number;
  currentPage?: number;
  pages?: number;
}

interface ValidResponse {
  status: Status.SUCCESS;
  data: CatalogueResponse | Product | BannerData[] | number;
}

export {
  type BaseProduct,
  type Product,
  type BannerData,
  type ErrorObject,
  type ValidResponse,
  Status,
};
