export type Battery = {
  standbyTime: string,
  talkTime: string,
  type: string,
};

export type Android = {
  os: string,
  ui: string,
};

export type Camera = {
  features: string[],
  primary: string,
};

export type Connectivy = {
  bluetooth: string,
  cell: string,
  gps: boolean,
  infrared: boolean,
  wifi: string,
};

export type Display = {
  screenResolution: string,
  screenSize: string,
  touchScreen: boolean,
};

export type Hardware = {
  accelerometer: string,
  audioJack: string,
  cpu: string,
  fmRadio: boolean,
  physicalKeyboard: boolean,
  usb: string,
};

export type SizeAndWeight = {
  dimensions: string[],
  weight: string,
};

export type Storage = {
  flash: string,
  ram: string,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface productDescription {
  additionalFeatures: string,
  android: Android,
  availability: string[],
  battery: Battery,
  camera: Camera,
  connectivy: Connectivy,
  description: string,
  display: Display,
  hardware: Hardware,
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: SizeAndWeight,
  storage: Storage,
}
