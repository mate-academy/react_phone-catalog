/* eslint-disable max-len */
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type FavSlice = {
  favProductsId: string[];
  addFavProductId: (productId: string) => void;
  deleteFavProductId: (productId: string) => void;
};

type CartSlice = {
  cartProductsId: string[];
  addCartProductId: (productId: string) => void;
  deleteCartProductId: (productId: string) => void;
};

// type CartTotalSlice = {
//   cartPrices: [{
//     quantity: number,
//     productId: string,
//   }];
//   addCartPrice: (productId: string) => void;
//   deleteCartPrice: (productId: string) => void;
// };

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
  cartProductsId: [],
  addCartProductId: (productId: string) => set((state) => ({
    cartProductsId: [...state.cartProductsId, productId],
  })),
  deleteCartProductId: (productId: string) => set((state) => ({
    cartProductsId: state.cartProductsId.filter((id) => id !== productId),
  })),
});

// export const createCartTotalSlice: StateCreator<CartTotalSlice> = (set) => ({
//   cartPrices: [
//     {
//       productId: '',
//       quantity: 1,
//     },
//   ],
//   addCartPrice: (productId: string) => set((state) => ({
//     cartPrices: { ...state.cartPrices, quantity: state.cartPrices.quantity + 1 },
//   })),
//   deleteCartPrice: (productId: string) => set((state) => ({
//     cartPrices: { ...state.cartPrices, quantity: state.cartPrices.quantity - 1 },
//   })),
// });

export const useProductStore = create<FavSlice & CartSlice>()(
  persist(
    (...args) => ({
      ...createFavSlice(...args),
      ...createCartSlice(...args),
      // ...createCartTotalSlice(...args),
    }),
    {
      name: 'id-storage',
    },
  ),
);
