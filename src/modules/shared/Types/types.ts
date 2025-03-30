export enum ActiveTab {
  home = 'home',
  phone = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
  favorites = 'favorites',
  cart = 'cart',
}

export enum LocalStorageKeys {
  favorites = 'favoritesItems',
  cart = 'cartItems',
  theme = 'savedThemeMode',
}

export enum ThemeModeKeys {
  isDark = 'isDark',
  isLight = 'isLight',
}

export enum CategoriesTypes {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export type UpdatedProduct = {
  id: number;
  category: CategoriesTypes;
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
  quantity: number;
  discount: boolean;
};

export interface ProductDetails {
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
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera: string;
  zoom: string;
}

export type Description = {
  title: string;
  text: string[];
};

export interface PaymentOption {
  paymentId: string;
  paymentTitle: string;
  paymentDescription: string;
}

export interface UserPaymentOptions {
  paymentId: string;
  paymentTitle: string;
  paymentDescription: string;
  isChecked: boolean;
}

export enum DeliveryMethod {
  ByNP = 'NP',
  ToAddress = 'Address',
  Unset = '',
}

export interface GoogleCredentials {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: string;
  iss: string;
  jti: string;
  name: string;
  nbf: string;
  picture: string;
  sub: string;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  deliveryCity: string;
  deliverTo: string;
  paymentMethod: string;
  password: string;
  isLoggedInByGoogle: boolean;
  discountInfo: {
    code: string;
    isActive: boolean;
  };
  buildingDetails: {
    building: string;
    entrance: string;
    apartment: string;
  };
}

export enum FormTypes {
  LogIn = 'Log-In',
  SignUp = 'Sign-Up',
}

export enum SessionStorageCredentials {
  GoogleResponse = 'GoogleResponse',
  CheckoutCredentials = 'CheckoutCredentials',
}
