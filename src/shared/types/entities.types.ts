import {
  Screens,
  Capacity,
  Colors,
  Ram,
  Category,
  Resolutions,
  Processors,
  Cells,
  Cameras,
} from './entities.enums';

type BannerData = {
  id: number;
  srcWide: string;
  srcSquare: string;
  alt: string;
  ariaLabel: string;
  href: string;
};

type Description = {
  title: string;
  text: string[];
};

interface BaseProd {
  category: Category;
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

interface CatalogueProduct extends BaseProd {
  key: number;
  year: number;
}

interface Product extends BaseProd {
  namespaceId: string;
  capacityAvailable: Capacity[];
  colorsAvailable: Colors[];
  description: Description[];
  resolution: Resolutions;
  processor: Processors;
  cell?: Cells[];
  camera?: Cameras;
  zoom?: string;
}

export { type BannerData, type CatalogueProduct, type Product };
