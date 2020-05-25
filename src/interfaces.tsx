
export interface LinkType {
  address: string;
  title: string;
  isOuter: boolean;
}

export interface Product   {
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

export interface CatalogPropsType {
  title?: string;
  products: Product[];
  cart: Product[];
  setCart: ([]) => void;
  favorites: Product[];
  setFavorites: ([]) => void;
}

export interface ProductCardPropsType {
  product: Product;
  cart: Product[];
  setCart: ([]) => void;
  favorites: Product[];
  setFavorites: ([]) => void;
}

export interface ProductDetails {
  additionalFeatures: string;
  android: Object;
  availability: string[];
  battery: Object;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: Object;
  storage: Object;
}

export interface Display {
  screenResolution: string;
}
export interface Hardware {
  cpu: string;
}
export interface Camera {
  primary: string;
}
export interface Connectivity {
  cell: string;
}

export interface MyContextType {
  products: Product[];
  cart: Product[];
  setCart: ([]) => void;
  favorites: Product[];
  setFavorites: ([]) => void;
}

