interface Phone {
  age: number;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
}

interface Details {
  additionalFeatures: string;
  android: System;
  availability: string[];
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: Size;
  storage: Storage;
}

interface PhonesWithDetails extends Phone {
  details: Details;
}

interface State {
  phones: PhonesWithDetails[] | [];
  phoneDetails: Details | null;
  phoneError: string;
}

interface System {
  os: string;
  ui: Android;
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

interface Hardware {
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
