import { create } from 'zustand';
import { Product } from './types/Product';

type StoreProducts = {
  products: Product[],
  favouritesProducts: Product[],
  cartProducts: Product[],
  setProducts: (newProducts: Product[]) => void,
  setFavouritesProducts: (newProducts: Product[]) => void,
  setCartProducts: (newProducts: Product[]) => void,
};

const favouritStorage = localStorage.getItem('Favourit')
  ? JSON.parse(localStorage.getItem('Favourit') || '')
  : [];
const cartStorage = localStorage.getItem('Cart')
  ? JSON.parse(localStorage.getItem('Cart') || '')
  : [];

export const useProducts = create<StoreProducts>((set) => ({
  products: [],
  favouritesProducts: favouritStorage,
  cartProducts: cartStorage,
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
