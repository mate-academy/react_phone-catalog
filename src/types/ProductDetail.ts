import { Product } from './Product';

type Display = {
  screenSize: string;
  screenResolution: string;
};

type Hardware = {
  cpu: string;
};

type Storage = {
  ram: string;
  flash: string;
};

type Camera = {
  primary: string;
};

type Connectivity = {
  cell: string;
};

export interface ProductDetail extends Product {
  name: string;
  description: string;
  display: Display;
  hardware: Hardware;
  storage: Storage;
  camera: Camera;
  connectivity: Connectivity;
}
