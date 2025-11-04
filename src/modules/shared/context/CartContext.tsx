// import React, { createContext } from 'react';
// import { useLocaleStorage } from '../hooks/useLocaleStorage';

// type CartContextType = {
//   cartList: string[];
//   setCartList: (v: string[]) => void;
// };

// export const CartContext = createContext<CartContextType>({
//   cartList: [],
//   setCartList: () => {},
// });

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cartList, setCartList] = useLocaleStorage<string[]>('cart', []);

//   return (
//     <CartContext.Provider value={{ cartList, setCartList }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
