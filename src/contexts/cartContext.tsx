import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { CartItem, CartProduct } from '../types/cartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ContextValue = {
  cartItems: CartItem[];
  sumPrice: number;
  itemsCount: number;
  addCartItem: (product: CartProduct) => void;
  deleteCartItem: (itemId: string) => void;
  changeItemQuantity: (itemId: string, operation: 1 | -1) => void;
};

const CartContext = createContext<ContextValue>({
  cartItems: [],
  sumPrice: 0,
  itemsCount: 0,
  addCartItem: () => {},
  deleteCartItem: () => {},
  changeItemQuantity: () => {},
});

export const CartProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addCartItem = useCallback((product: CartProduct) => {
    const cartItem = {
      product,
      id: product.itemId,
      quantity: 1,
    };

    setCartItems(current => current.concat(cartItem));
  }, []);

  const deleteCartItem = useCallback((itemId: string) => {
    setCartItems(current => [...current.filter(item => itemId !== item.id)]);
  }, []);

  const changeItemQuantity = useCallback(
    (itemId: string, operation: 1 | -1) => {
      setCartItems(current =>
        current.map(item => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + operation;

            return { ...item, quantity: newQuantity };
          }

          return item;
        }));
    },
    [],
  );

  const sumPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, curr) => acc + curr.product.price * curr.quantity,
        0,
      ),
    [cartItems],
  );
  const itemsCount = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    [cartItems],
  );

  const value = useMemo(() => {
    return {
      cartItems,
      sumPrice,
      itemsCount,
      addCartItem,
      deleteCartItem,
      changeItemQuantity,
    };
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
