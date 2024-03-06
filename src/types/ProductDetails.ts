export type ProductDetails = {
  id: string;
  name: string;
  description: string;
  additionalFeatures: string;
  android: AndroidInfo;
  availability: string[];
  battery: BatteryInfo;
  camera: CameraInfo;
  connectivity: ConnectivityInfo;
  display: DisplayInfo;
  hardware: HardwareInfo;
  images: string[];
  sizeAndWeight: SizeAndWeightInfo;
  storage: StorageInfo;
};

type AndroidInfo = {
  os: string;
  ui: string;
};

type BatteryInfo = {
  standbyTime: string;
  talkTime: string;
  type: string;
};

type CameraInfo = {
  features: string[];
  primary: string;
};

type ConnectivityInfo = {
  bluetooth: string;
  cell: string;
  gps: boolean;
  infrared: boolean;
  wifi: string;
};

type DisplayInfo = {
  screenResolution: string;
  screenSize: string;
  touchScreen: boolean;
};

type HardwareInfo = {
  accelerometer: boolean;
  audioJack: string;
  cpu: string;
  fmRadio: boolean;
  physicalKeyboard: boolean;
  usb: string;
};

type SizeAndWeightInfo = {
  dimensions: string[];
  weight: string;
};

type StorageInfo = {
  flash: string;
  ram: string;
};
