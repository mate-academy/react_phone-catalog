import type { Product } from '../types/Product';
import { withBase } from '../modules/shared/utils/baseUrl';

type DescriptionItem = {
  title: string;
  text: string;
};

type PhoneFromServer = {
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
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type PhoneDetails = PhoneFromServer;

export type Phone = Product;

export const getPhones = async (): Promise<Phone[]> => {
  const response = await fetch(withBase('api/phones.json'));

  if (!response.ok) {
    throw new Error('Unable to load phones');
  }

  const phonesFromServer: PhoneFromServer[] = await response.json();

  return phonesFromServer.map(phone => ({
    id: phone.id,
    name: phone.name,
    screen: phone.screen,
    capacity: phone.capacity,
    ram: phone.ram,
    price: phone.priceDiscount,
    fullPrice: phone.priceRegular,
    image: withBase(phone.images[0]),
  }));
};

export const getPhoneDetails = async (
  id: string,
): Promise<PhoneDetails | null> => {
  const [phonesResponse, tabletsResponse, accessoriesResponse] =
    await Promise.all([
      fetch(withBase('api/phones.json')),
      fetch(withBase('api/tablets.json')),
      fetch(withBase('api/accessories.json')),
    ]);

  if (!phonesResponse.ok || !tabletsResponse.ok || !accessoriesResponse.ok) {
    throw new Error('Unable to load phone details');
  }

  const phonesFromServer: PhoneFromServer[] = await phonesResponse.json();
  const tabletsFromServer: PhoneFromServer[] = await tabletsResponse.json();
  const accessoriesFromServer: PhoneFromServer[] =
    await accessoriesResponse.json();

  const found =
    phonesFromServer.find(item => item.id === id) ??
    tabletsFromServer.find(item => item.id === id) ??
    accessoriesFromServer.find(item => item.id === id);

  return found ?? null;
};
