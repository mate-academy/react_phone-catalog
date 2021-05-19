export interface NavLinkType {
  id: string;
  name: string;
  typeOfLink: string;
  url: string;
}

export interface NavType {
  navLinks: NavLinkType[];
  navType: 'header' | 'footer';
}

export type Product = {
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
  quantity: number;
};

export type ProductType = {
  product: Product;
};

export type Products = Product[];

export type Slider = {
  sliderType: 'Hot Prices' | 'Brand New Models' | 'You may also like';
};

type Display = {
  screenSize: string;
  screenResolution: string;
};

type Storage = {
  ram: string;
  flash: string;
};

type Connectivity = {
  bluetooth: string;
  cell: string;
  wifi: string;
};

type Camera = {
  primary: string;
};

type Cpu = {
  cpu: string;
};

export type ProductDetails = {
  product: ProductDetailsType;
};

export type ProductDetailsType = {
  id: string;
  name: string;
  hardware: Cpu;
  display: Display;
  storage: Storage;
  camera: Camera;
  description: string;
  images: string[];
  connectivity: Connectivity;
  additionalFeatures: string;
};
