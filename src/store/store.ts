import { create } from 'zustand';
import { storage } from '../support/utility';
import { Gadget } from '../support/types';

export interface Counter {
  fav: string,
  cart: string,
  setCount: (key: string) => void
}

export const counter = create<Counter>((set) => ({
  fav: '',
  cart: '',
  setCount: (key: string) => set((state) => {
    const res = String(storage.getAll(key).length - 1);

    if (key === 'favourites') {
      return { ...state, fav: res };
    }

    if (key === 'cart') {
      return { ...state, cart: res };
    }

    return { ...state };
  }),
}));

export interface GadgetList {
  list: Gadget[];
  setList: (arg: Gadget[]) => void
}

export const storeGadgets = create<GadgetList>((set) => ({
  list: [],
  setList: (data) => set(() => ({ list: data })),
}));

interface Modalingr {
  isOpen: boolean;
  id: number;
  setIsOpen: (by: boolean) => void
  setID: (by: number) => void
}

export const useModalStore = create<Modalingr>((set): Modalingr => ({
  isOpen: false,
  id: 0,
  setIsOpen: (arg: boolean) => set((state) => ({ ...state, isOpen: arg })),
  setID: (arg:number) => set((state) => ({ ...state, id: arg })),
}));
