export interface Phones {
  age: number;
  id: string;
  type: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

export interface GadgetDetails {
  additionalFeatures: string;
  android: Android;
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
  sizeAndWeight: SizeAndWeight;
  storage: Storage;
}

interface Display {
  screenResolution: string;
}

interface Hardware {
  cpu: string;
}

interface Camera {
  primary: string;
}

interface Connectivity {
  cell: string;
}

interface Battery {
  standbyTime: string;
  talkTime: string;
  type: string;
}

interface Android {
  os: string;
  ui: string;
}

interface SizeAndWeight {
  dimensions: string[];
  weight: string;
}

interface Storage {
  flash: string;
  ram: string;
}
