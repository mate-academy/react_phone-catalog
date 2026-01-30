import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface CartItem {
  amount: number;
  product: Product;
}

const emptyCart: CartItem[] = [];

interface CartContextProps {
  cart: CartItem[] | null;
  setCart: Dispatch<SetStateAction<CartItem[]>> | null;
  toggleProductInCart: ((product: Product | null) => void) | null;
  isInCart: ((product: Product | null) => boolean) | null;
}

const CartContext = createContext<CartContextProps>({
  cart: emptyCart,
  setCart: null,
  toggleProductInCart: null,
  isInCart: null,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const res = JSON.parse(localStorage.getItem('cart') || '') as CartItem[];

    return res || emptyCart;
  });

  localStorage.setItem('cart', JSON.stringify(cart));

  const toggleProductInCart = (product: Product | null) => {
    if (!product) {
      return null;
    }

    return setCart(cur => {
      if (cur.some(elem => elem.product.id === product.id)) {
        return cur.filter(elem => {
          if (elem.product.id === product.id) {
            return false;
          }

          return true;
        });
      }

      return [...cur, { amount: 1, product }];
    });
  };

  const isInCart = (product: Product | null) => {
    if (!product || !cart) {
      return false;
    }

    return cart.some(elem => {
      if (elem.product.itemId === product.itemId) {
        return true;
      }

      return false;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, toggleProductInCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
