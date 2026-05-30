import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartItemType, Products } from '../types/Types';

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (product: Products) => void;
  isInTheCart: (productId: CartItemType['id']) => boolean;
  removeItemCart: (productId: CartItemType['id']) => void;
  updateQuantity: (productId: CartItemType['id'], newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

const CartContaxt = createContext<CartContextType | null>(null);

export const CartPageProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const savedCart = window.localStorage.getItem('cartItems');

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Products) => {
    setCartItems(previousItems => {
      const isAlreadyIncluded = previousItems.some(
        item => item.id === product.id,
      );

      if (isAlreadyIncluded) {
        return [...previousItems];
      }

      return [...previousItems, { id: product.id, quantity: 1, product }];
    });
  }, []);

  const isInTheCart = useCallback(
    (productId: CartItemType['id']) =>
      cartItems.some(item => item.id === productId),
    [cartItems],
  );

  const removeItemCart = useCallback((productId: CartItemType['id']) => {
    setCartItems(previousItems =>
      [...previousItems].filter(item => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: CartItemType['id'], newQuantity: number) => {
      if (newQuantity === 0) {
        removeItemCart(productId);
      }

      setCartItems(previousItems => {
        return previousItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : { ...item },
        );
      });
    },
    [removeItemCart],
  );

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalPrice = useCallback(
    () =>
      cartItems.reduce(
        (acc, item) => item.product.price * item.quantity + acc,
        0,
      ),
    [cartItems],
  );

  const value = {
    totalPrice,
    clearCart,
    updateQuantity,
    isInTheCart,
    removeItemCart,
    addToCart,
    cartItems,
  };

  return <CartContaxt.Provider value={value}>{children}</CartContaxt.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContaxt);

  if (!context) {
    throw new Error('useCart must be used within a CartPageProvider');
  }

  return context;
};
