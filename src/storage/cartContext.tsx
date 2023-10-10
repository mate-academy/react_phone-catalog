import { Dispatch, SetStateAction, createContext } from 'react';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { CartItemType } from '../types/cartItemType';
import { Phone } from '../types/phone';

type Props = {
  children: React.ReactNode,
};

type CartContextType = {
  cart: CartItemType[],
  setCart: Dispatch<SetStateAction<CartItemType[]>>,
  handleCart: (p: Phone) => void,
  isInCart: (p: Phone) => boolean,
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  handleCart: () => {},
  isInCart: () => false,
});

export const CartProvider:React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>('cart', []);

  const isInCart = (product: Phone) => {
    return cart.some(cartItem => cartItem.product.id === product.id);
  };

  const handleCart = (product: Phone) => {
    if (isInCart(product)) {
      setCart(prev => prev
        .filter(cartItem => cartItem.product.id !== product.id));
    } else {
      const newCartItem = {
        id: cart.length + 1,
        quantity: 1,
        product,
      } as CartItemType;

      setCart(prev => [...prev, newCartItem]);
    }
  };

  return (
    <CartContext.Provider value={{
      cart, setCart, handleCart, isInCart,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};
