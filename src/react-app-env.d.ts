// / <reference types="react-scripts" />

interface Products {
  age: number;
  type: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  length: number;
  info?: Product;
}

type Slider = {
  id: number;
  imgUrl: string;
};

interface Product {
  additionalFeatures: string;
  android: {
    os: string;
    ui: string;
  };
  availability: Array;
  battery: {
    standbyTime: string;
    talkTime: string;
    type: string;
  };
  camera: {
    features: Array;
    primary: string;
  };
  connectivity: {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
  };
  description: string;
  display: {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
  };
  hardware: {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
  };
  id: string;
  images: Array;
  name: string;
  sizeAndWeight: {
    dimensions: Array;
    weight: string;
  };
  storage: {
    flash: string;
    ram: string;
  };
}

interface CartProduct {
  product: {
    age: number;
    type: string;
    id: string;
    imageUrl: string;
    name: string;
    snippet: string;
    price: number;
    discount: number;
    screen: string;
    capacity: string;
    ram: string;
    length: number;
  };
  quantity: number;
}
