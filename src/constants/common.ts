import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

export const links = [
  { name: 'HOME', path: '/' },
  { name: 'PHONES', path: 'phones' },
  { name: 'TABLETS', path: 'tablets' },
  { name: 'ACCESSORIES', path: 'accessories' },
];

export interface Product {
  id: number;
  category: string;
  itemId: string;
  image: string;
  fullPrice: number;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
}
export interface ItemCard {
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
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export interface SliderCardsProps {
  title: string;
  products: Product[];
  discountPrice?: boolean;
}

type ProductDescription = {
  title: string;
  text: string[];
};

export interface FavoriteItem {
  id: string;
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  category: string;
  screen: string;
  capacity: string;
  ram: string
  quantity: number;
}

export  const colorMap: Record<string, string> = {
  midnight: 'black',
  white: '#F0F0F0',
  spacegray: '#4A4A4A',
  starlight: '#E6E2D3',
  graphite: '#383428',
  sierrablue: '#BFDAF7',
  spaceblack: '#1D1D1F',
  midnightgreen: '#566D63',
  rosegold: '#F4C2C2',
  blacktitanium: "black",
};

export { phones, tablets, accessories };
