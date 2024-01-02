import { Cart } from './Cart';
import { Product } from './Product';

export interface Context {
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  phones: Product[],
  setPhones: React.Dispatch<React.SetStateAction<Product[]>>;
  tablets: Product[],
  setTablets: React.Dispatch<React.SetStateAction<Product[]>>;
  accessories: Product[],
  setAccessories: React.Dispatch<React.SetStateAction<Product[]>>;
  filterdProducts: Product[];
  setFilterdProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  cartItems: Cart[];
  favourites: Product[];
  hasItems: (prodId: number, product: (Product | Cart)[]) => boolean,
  addCart: (id: number, product: Product) => void;
  deleteCart: (cartId: number) => void;
  plusQuantity: (cartId: number, quantity: number) => void;
  minusQuantity: (cartId: number, quantity: number) => void;
  addFavourites: (cartId: number, product: Product) => void;
}
