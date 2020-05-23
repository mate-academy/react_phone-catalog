
export interface Link {
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
  favorites: Product[];
  setFavorites: (favorites:Product[]) => void,
  setCart: (cart:Product[]) => void,
}
export interface ProductCardPropsType {
  product: Product;
  cart: Product[];
  favorites: Product[];
  setFavorites: (favorites:Product[]) => void,
  setCart: (cart:Product[]) => void,
}

