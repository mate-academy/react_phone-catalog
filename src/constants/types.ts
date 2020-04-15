
export interface PhoneInterface {
  id: string;
  phoneId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface PhoneDetailsInterface {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

interface Description {
  title: string;
  text: string[];
}

export interface CartState {
  cart: CartInterface[];
  cartTrigger: boolean;
}
export interface Colors {
  [key: string]: string;
}

export interface LoadState {
  isLoadingPhones: boolean;
  isLoadingDetails: boolean;
}

export interface FavouritesState {
  favourites: string[];
}

export interface PhoneState {
  phones: PhoneInterface[];
  details: PhoneDetailsInterface | null;
  query: string;
  paginationPage: number;
}

export interface CartInterface {
  id: string;
  amount: number;
  imgLink: string;
  price: number;
}
