type Android = {
  os: string,
  ui: string,
};

type Battery = {
  standbyTime: string,
  talkTime: string,
  type: string,
};

type Camera = {
  features: string[],
  primary: string,
};

type Connectivity = {
  bluetooth: string,
  cell: string,
  gps: boolean,
  infrared: false,
  wifi: string,
};

type Display = {
  screenResolution: string,
  screenSize: string,
  touchScreen: boolean,
};

type Hardware = {
  accelerometer: boolean,
  audioJack: string,
  cpu: string,
  fmRadio: boolean,
  physicalKeyboard: boolean,
  usb: string,
};

type SizeAndWeight = {
  dimensions: string[],
  weight: string,
};

type Storage = {
  flash: string,
  ram: string,
};

export interface ProductDetails {
  additionalFeatures: string,
  android: Android,
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
