// / <reference types="react-scripts" />

interface Gadget {
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

interface GadgetDetail {
  additionalFeatures: string;
  android?: {
    os?: string;
    ui?: string;
  };
  availability: string[];
  battery?: {
    standbyTime?: string;
    talkTime?: string;
    type?: string;
  }
  camera: {
    primary: string;
    zoom: string;
  };
  connectivity: {
    cell: string;
  };
  description: string;
  display: {
    screenResolution: string;
  };
  hardware: {
    cpu: string;
  };
  id: string;
  images: Array<string>;
  name: string;
  sizeAndWeight: Object;
  storage?: {
    flash: string;
    ram: string;
  };
}
