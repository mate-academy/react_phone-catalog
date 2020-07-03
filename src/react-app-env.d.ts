// / <reference types="react-scripts" />
interface Product {
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
}

interface ProductDetails {
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
    screenSize: string;
  };
  camera: {
    primary: string;
    zoom: string;
  };
  connectivity: {
    cell: string;
    wifi: string;

  };
  storage?: {
    flash: string;
    ram: string;
  };
  sizeAndWeight?: {
    weight: string;
  };
}

interface CartProduct {
  product: Product;
  quantity: number;
}
