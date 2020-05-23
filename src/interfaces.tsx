
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
  camera: Object;
  connectivity: Object;
  description: string;
  display: Object;
  hardware: Object;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: Object;
  storage: Object;
}

