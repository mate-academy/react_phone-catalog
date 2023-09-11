import { ReactNode, createContext } from 'react';
import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: ReactNode,
};

type CartContextType = {
  cart: CartItem[],
  addToCart: (newProduct: CartItem) => void,
  removeFromCart: (productId: string) => void,
  quantityCart: (productId: string, action: Action) => void,
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  quantityCart: () => {},
});

export enum Action {
  Increase = 'increase',
  Decrease = 'decrease',
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (product: CartItem) => {
    setCart([
      ...cart,
      product,
    ]);
  };

  const quantityCart = (productId: string, action: Action) => {
    const newCart = cart.map(item => {
      if (productId === item.id) {
        switch (action) {
          case 'increase':

            return { ...item, quantity: item.quantity + 1 };

          case 'decrease':
            return { ...item, quantity: item.quantity - 1 };

          default: return item;
        }
      }

      return item;
    });

    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    setCart([
      ...cart.filter(item => item.product.itemId !== productId),
    ]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      quantityCart,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};
