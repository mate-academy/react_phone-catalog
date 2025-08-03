import { catalogueValidIDs, GlobalValidNameSpaceIDs } from '@server/static';
import {
  Cameras,
  Capacity,
  Category,
  Cells,
  Colors,
  Description,
  Processors,
  Ram,
  Resolutions,
  Screens,
} from './itemsEnums';
import { CategoryParams } from './APIEnums';

interface BaseProduct {
  id: (typeof catalogueValidIDs)[number];
  category: Omit<CategoryParams, CategoryParams.ALL>;
  itemId: GlobalValidNameSpaceIDs;
  name: string;
  capacity: Capacity;
  fullPrice: number;
  price: number;
  color: Colors;
  image: string;
  screen: Screens;
  ram: Ram;
  year: number;
}

interface Product {
  id: string;
  category: Category;
  namespaceId: GlobalValidNameSpaceIDs;
  name: string;
  capacityAvailable: Capacity[];
  capacity: Capacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Colors[];
  color: Colors;
  images: string[];
  description: Description[];
  screen: Screens;
  resolution: Resolutions;
  processor: Processors;
  ram: Ram;
  cell: Cells[];
  camera?: Cameras;
}

interface BannerData {
  src: string;
  alt: string;
  href: string;
}

export { type BaseProduct, type Product, type BannerData };
