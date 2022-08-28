export interface Product {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
  idKey?: number,
}

export interface RootState {
  favorits: string[],
  selectedcart: ObjectForCart[],
}

export interface ObjectForCart {
  id: string,
  quantity: number,
  product: Product,
}

export interface AddInfo {
  images: string[],
}

export interface ProductDetails {
  additionalFeatures: string,
  android: OSUI,
  availability: string[],
  battery: Battery,
  camera: Camera,
  connectivity: Connectivity,
  description: string,
  display: Display,
  hardware: Hardware,
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: SizeAndWeight,
  storage: Storage,
}

export interface OSUI {
  os: string,
  ui: string,
}

export interface Battery {
  standbyTime: string,
  talkTime: string,
  type: string,
}

export interface Camera {
  features: string[],
  primary: string,
}

export interface Connectivity {
  bluetooth: string,
  cell: string,
  gps: boolean,
  infrared: boolean,
  wifi: string,
}

export interface Display {
  screenResolution: string,
  screenSize: string,
  touchScreen: boolean,
}

export interface Hardware {
  accelerometer: boolean,
  audioJack: string,
  cpu: string,
  fmRadio: boolean,
  physicalKeyboard: boolean,
  usb: string,
}

export interface SizeAndWeight {
  dimensions: string[],
  weight: string,
}

export interface Storage {
  flash: string,
  ram: string,
}
