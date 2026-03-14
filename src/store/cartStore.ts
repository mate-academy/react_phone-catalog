// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartState {
//   cartItems: any[]; // Потім заміниш на свій тип Product
//   addToCart: (item: any) => void;
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     set => ({
//       cartItems: [],
//       addToCart: item =>
//         set(state => ({ cartItems: [...state.cartItems, item] })),
//     }),
//     { name: 'cart-storage' },
//   ),
// );
