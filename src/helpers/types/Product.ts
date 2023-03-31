import { Gadget } from './Gadjets';

export interface Product {
  type: Gadget,
  price: number,
  discount: number,
  age: number,
  id: string,
  imageUrl: string,
  name: string,
  screen: string,
  capacity: string,
  ram: string,
}

export interface ProductDetails {
  additionalFeatures: string,
  android: {
    os: string,
    ui: string,
  },
  availability: string[],
  battery: {
    standbyTime: string,
    talkTime: string,
    type: string,
  },
  camera: {
    features: string[],
    primary: string,
  },
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: boolean,
    infrared: boolean,
    wifi: string,
  },
  description: string,
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: boolean,
  },
  hardware: {
    accelerometer: boolean,
    audioJack: string,
    cpu: string,
    fmRadio: boolean,
    physicalKeyboard: boolean,
    usb: string,
  },
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: {
    dimensions: string[],
    weight: string,
  },
  storage: {
    flash: string,
    ram: string,
  }
}
