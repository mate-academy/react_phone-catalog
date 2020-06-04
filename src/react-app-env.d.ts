// / <reference types="react-scripts" />

interface Phone {
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

interface ItemDetail {
  id: string;
  name: string;
  android?: {
    os?: string;
    ui?: string;
  };
  images: Array<string>;
  battery?: {
    standbyTime?: string;
    talkTime?: string;
    type?: string;
  };
  description: string;
  additionalFeatures: string;
  hardware: {
    cpu: string;
  };
  display: {
    screenResolution: string;
  };
  camera: {
    primary: string;
    zoom: string;
  };
  connectivity: {
    cell: string;
  };
  storage?: {
    flash: string;
    ram: string;
  };
}
