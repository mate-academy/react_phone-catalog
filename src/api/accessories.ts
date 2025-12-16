import type { Product } from '../types/Product';

type AccessoryFromServer = {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  ram: string;
  images: string[];
};

export type Accessory = Product;

export const getAccessories = async (): Promise<Accessory[]> => {
  const response = await fetch('/api/accessories.json');

  if (!response.ok) {
    throw new Error('Unable to load accessories');
  }

  const accessoriesFromServer: AccessoryFromServer[] = await response.json();

  return accessoriesFromServer.map(accessory => ({
    id: accessory.id,
    name: accessory.name,
    screen: accessory.screen,
    capacity: accessory.capacity,
    ram: accessory.ram,
    price: accessory.priceDiscount,
    fullPrice: accessory.priceRegular,
    image: `/${accessory.images[0]}`,
  }));
};
