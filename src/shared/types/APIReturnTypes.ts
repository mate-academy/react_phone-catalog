import {
  Cameras,
  Capacity,
  Cells,
  Colors,
  Processors,
  Ram,
  Resolutions,
  Screens,
} from '.';

enum Category {
  Accessories = 'accessories',
  Phones = 'phones',
  Products = 'all',
  Tablets = 'tablets',
}

type Description = {
  title: string;
  text: string;
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

interface ItemProduct extends BaseProd {
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

export { Category, type CatalogueProduct, type ItemProduct };
