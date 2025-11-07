import {
  Cameras,
  Capacity,
  Cells,
  Colors,
  PhoneZoom,
  Processors,
  Ram,
  Resolutions,
  Screens,
  ServerCategory,
} from '@server/static';

interface BannerData {
  id: number;
  srcWide: string;
  srcSquare: string;
  alt: string;
  ariaLabel: string;
  href: string;
}

interface CatalogueData {
  items: BaseProduct[];
  currentPage: number;
  pages: number;
}

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
  category: ServerCategory;
}

interface BaseProduct extends Base {
  key: number;
  year: number;
}

type Description = {
  title: string;
  text: string;
};

interface Product extends Base {
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

export { type BannerData, type CatalogueData, type BaseProduct, type Product };
