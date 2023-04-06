export interface ProductInfo {
  additionalFeatures: string;
  price: number;
  discount: number;
  android: Android;
  availability?: (string)[] | null;
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images?: (string)[] | null | any;
  name: string;
  sizeAndWeight: SizeAndWeight;
  storage: Storage;
  type: string;
}

export interface Android {
  os: string;
  ui: string;
}

export interface Battery {
  standbyTime: string;
  talkTime: string;
  type: string;
}

export interface Camera {
  features?: (string)[] | null;
  primary: string;
}

export interface Connectivity {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
}

export interface Display {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
}

export interface Hardware {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean;
  usb: string;
}

export interface SizeAndWeight {
  dimensions?: (string)[] | null;
  weight: string;
}

export interface Storage {
  capacity: string;
  availableCapacity: string[];
  ram: string;
}
