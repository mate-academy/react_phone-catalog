import type { Product } from '../types/Product';

type TabletFromServer = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: unknown;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type Tablet = Product;

export const getTablets = async (): Promise<Tablet[]> => {
  const response = await fetch('/api/tablets.json');

  if (!response.ok) {
    throw new Error('Unable to load tablets');
  }

  const tabletsFromServer: TabletFromServer[] = await response.json();

  return tabletsFromServer.map(tablet => ({
    id: tablet.id,
    name: tablet.name,
    screen: tablet.screen,
    capacity: tablet.capacity,
    ram: tablet.ram,
    price: tablet.priceDiscount,
    fullPrice: tablet.priceRegular,
    image: `/${tablet.images[0]}`,
  }));
};
