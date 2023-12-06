export type ItemDetails = {
  additionalFeatures: string;
  android: AndroidType;
  availability: string[];
  battery: BatteryType;
  camera: CameraType;
  connectivity: ConnectivityType;
  description: string;
  display: DisplayType;
  hardware: HardwareType;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: SizeAndWeightType;
  storage: StorageType;
}

type AndroidType = {
  os: string;
  ui: string;
}

type BatteryType = {
  standbyTime: string;
  talkTime: string;
  type: string;
}

type CameraType = {
  features: string[];
  primary: string;
}

type ConnectivityType = {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
}

type DisplayType = {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
}

type HardwareType = {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean;
  usb: string;
}

type SizeAndWeightType = {
  dimensions: string[];
  weight: string;
}

type StorageType = {
  flash: string;
  ram: string;
}
