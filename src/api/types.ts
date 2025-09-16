export type Phone = {
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
  colorsAvailable: string[];
  color: string;
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
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type Accessory = {
  id: string;
  category: string;
  namespaceId: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
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

export type StorageCartItem = {
  id: number;
  quantity: number;
  productId: number;
};

export const SLIDER_TYPE = {
  NEW: 'new',
  HOT: 'hot',
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
  favItems: number[];
  setFavItems: React.Dispatch<React.SetStateAction<number[]>>;
  cartItems: StorageCartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<StorageCartItem[]>>;
};
