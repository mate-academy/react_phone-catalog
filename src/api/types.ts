import { COLOR_MAP } from '../modules/ProductDetailsPage/utility/colorMap';

export type Phone = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: (keyof typeof COLOR_MAP)[];
  color: keyof typeof COLOR_MAP;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
  ];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type Tablet = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: (keyof typeof COLOR_MAP)[];
  color: keyof typeof COLOR_MAP;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
  ];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: keyof typeof COLOR_MAP;
  ram: string;
  year: number;
  image: string;
};

export type Accessory = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: (keyof typeof COLOR_MAP)[];
  color: keyof typeof COLOR_MAP;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
  ];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
};

export type Fav = {
  productId: number;
  hasDiscount: boolean;
};

export type CatalogItem = Phone | Tablet | Accessory;

export type StorageCartItem = {
  id: number;
  quantity: number;
  productId: number;
  image: string;
  name: string;
  price: number;
};

export const SLIDER_TYPE = {
  NEW: 'new',
  HOT: 'hot',
  RAND: 'rand',
} as const;

export type Slider = (typeof SLIDER_TYPE)[keyof typeof SLIDER_TYPE];

const Direction = {
  Left: 'left',
  Right: 'right',
} as const;

export type DirectionType = (typeof Direction)[keyof typeof Direction];

export type DataContextProps = {
  phones: Phone[];
  products: Product[];
  tablets: Tablet[];
  accessories: Accessory[];
  isLoading: boolean;
  favItems: Fav[];
  setFavItems: React.Dispatch<React.SetStateAction<Fav[]>>;
  cartItems: StorageCartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<StorageCartItem[]>>;
};
