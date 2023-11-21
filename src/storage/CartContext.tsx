import React, { useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { NotificationContext, NotificationStatus } from './NotificationContext';

type CartItem = {
  id: string,
  quantity: number,
  product: Product,
};

type Context = {
  cartItems: CartItem[];
  handleCart: (product: Product) => void;
  isInCart: (productName: string) => boolean;
  changeQuantity: (productId: string, value: number) => void;
};

export const CartContext = React.createContext<Context>({
  cartItems: [],
  handleCart: () => { },
  changeQuantity: () => { },
  isInCart: () => false,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [
    cartItems, setCartItems,
  ] = useLocalStorage<CartItem[]>('cartItems', []);
  const { setNotification } = useContext(NotificationContext);

  const isInCart = (productName: string) => cartItems
    .some(cart => cart.product.name === productName);

  const addToCart = (product: Product) => {
    const newItem = {
      id: product.itemId,
      quantity: 1,
      product,
    } as CartItem;

    setCartItems([...cartItems, newItem]);

    setNotification({
      message: 'Added to cart',
      color: NotificationStatus.Success,
    });
  };

  const removeFromCart = (productName: string) => {
    setCartItems(cartItems
      .filter(curProd => curProd.product.name !== productName));

    setNotification({
      message: 'Deleted from cart',
      color: NotificationStatus.Error,
    });
  };

  const handleCart = (product: Product) => {
    if (isInCart(product.name)) {
      removeFromCart(product.name);
    } else {
      addToCart(product);
    }
  };

  const changeQuantity = (itemId: string, value: number) => {
    setCartItems(cartItems
      .map(curItem => {
        return curItem.id === itemId
          ? { ...curItem, quantity: value }
          : curItem;
      }));
  };

  const value = {
    cartItems,
    handleCart,
    changeQuantity,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
