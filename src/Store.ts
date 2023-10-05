import { create } from 'zustand';
import { Product } from './types/Product';

type Store = {
  products: Product[],
  favouritesProducts: Product[],
  cartProducts: Product[],
  setProducts: (newProducts: Product[]) => void,
  setFavouritesProducts: (newProducts: Product[]) => void,
  setCartProducts: (newProducts: Product[]) => void,
};

const FavouritStorage = localStorage.getItem('Favourit')
  ? JSON.parse(localStorage.getItem('Favourit') || '')
  : [];
const CartStorage = localStorage.getItem('Cart')
  ? JSON.parse(localStorage.getItem('Cart') || '')
  : [];

export const useProducts = create<Store>((set) => ({
  products: [],
  favouritesProducts: FavouritStorage,
  cartProducts: CartStorage,
  setProducts: (newProducts: Product[]) => set(() => ({
    products: newProducts,
  })),
  setFavouritesProducts: (newProducts: Product[]) => set(() => ({
    favouritesProducts: [...newProducts],
  })),
  setCartProducts: (newProducts: Product[]) => set(() => ({
    cartProducts: [...newProducts],
  })),
}));
