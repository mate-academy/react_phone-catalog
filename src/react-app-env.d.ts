/// <reference types="react-scripts" />

interface Phone {
  age: number;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
}

interface Battery {
  standbyTime: string;
  talkTime: string;
  type: string;
}

interface Camera {
  features: string[];
  primary: string;
}

interface Connectivity {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
}

interface Display {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
}

interface Hardawre {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean;
  usb: string;
}

interface Size {
  dimensions: string[];
  weight: string;
}

interface Storage {
  flash: string;
  ram: string;
}

interface Android {
  os: string;
  ui: string;
}

interface Details {
  additionalFeatures: string;
  android: Android;
  availability: string[];
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardawre;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: Size;
  storage: Storage;
}

interface Item {
  id: string;
  quantity: number;
  phone: string;
}

interface Basket {
  id: string;
  phone: string;
  quantity: number;
}

interface CatalogState {
  phones: Phone[];
}

interface BasketState {
  basket: Basket[];
}

interface BasketButtonState {
  isOpened: boolean;
}

interface PhoneDetailsState {
  phone: Details|null;
}

interface ErrorState {
  error: string|null;
}

interface LoadState {
  isLoading: boolean;
  isLoaded: boolean;
}

interface LikesState {
  likes: string[];
}
