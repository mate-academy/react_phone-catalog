import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { CartItemType } from '../helpers/сartItemType';
import { Product } from '../types/Product';
import { NotificationContext, NotificationStatus } from './notificationContext';

type Props = {
  children: React.ReactNode;
};

type CartContextType = {
  cart: CartItemType[];
  setCart: Dispatch<SetStateAction<CartItemType[]>>;
  handleCart: (p: Product) => void;
  isInCart: (p: Product) => boolean;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  handleCart: () => {},
  isInCart: () => false,
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>('cart', []);
  const { setNotification } = useContext(NotificationContext);
  const isInCart = (product: Product) => {
    return cart.some((cartItem) => cartItem.product.id === product.id);
  };

  const handleCart = (product: Product) => {
    if (isInCart(product)) {
      setCart((prev) => prev.filter((cartItem) => cartItem.product.id
        !== product.id));
      setNotification({
        message: 'Deleted from cart',
        color: NotificationStatus.Error,
      });
    } else {
      const newCartItem = {
        id: cart.length + 1,
        quantity: 1,
        product,
      } as CartItemType;

      setCart((prev) => [...prev, newCartItem]);
      setNotification({
        message: 'Added to cart',
        color: NotificationStatus.Success,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
