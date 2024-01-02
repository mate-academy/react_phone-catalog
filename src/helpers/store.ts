/* eslint-disable max-len */
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type FavSlice = {
  favProductsId: string[];
  addFavProductId: (productId: string) => void;
  deleteFavProductId: (productId: string) => void;
};

type CartSlice = {
  cartProducts: {
    name: string;
    quantity: number;
  }[];
  addCartProductId: (productId: string) => void;
  deleteCartProductId: (productId: string) => void;
  incQuantity: (productId: string) => void;
  decQuantity: (productId: string) => void;
};

export const createFavSlice: StateCreator<FavSlice> = (set) => ({
  favProductsId: [],
  addFavProductId: (productId: string) => set((state) => ({
    favProductsId: [...state.favProductsId, productId],
  })),
  deleteFavProductId: (productId: string) => set((state) => ({
    favProductsId: state.favProductsId.filter((id) => id !== productId),
  })),
});

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cartProducts: [],
  addCartProductId: (productId: string) => set((state) => ({
    cartProducts: [
      ...state.cartProducts,
      {
        name: productId,
        quantity: 1,
      },
    ],
  })),
  deleteCartProductId: (productId: string) => set((state) => ({
    cartProducts: state.cartProducts.filter(
      (product) => product.name !== productId,
    ),
  })),

  incQuantity: (productId: string) => set((state) => ({
    cartProducts: state.cartProducts.map((product) => ({
      ...product,
      quantity:
          product.name === productId ? product.quantity + 1 : product.quantity,
    })),
  })),
  decQuantity: (productId: string) => set((state) => ({
    cartProducts: state.cartProducts.map((product) => ({
      ...product,
      quantity:
          product.name === productId ? product.quantity - 1 : product.quantity,
    })),
  })),
});

export const useProductStore = create<FavSlice & CartSlice>()(
  persist(
    (...args) => ({
      ...createFavSlice(...args),
      ...createCartSlice(...args),
    }),
    {
      name: 'id-storage',
    },
  ),
);
