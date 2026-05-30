import { createContext } from 'react';
import {
  SerializableObject,
  useLocalStorageList,
} from '../../../_hooks/useLocalStorageList';

interface CartItem extends SerializableObject {
  id: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  isInCard: (itemId: string) => boolean;
}
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  isInCard: () => true,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    items: cart,
    setItems,
    addItem,
    removeItem,
    isItemInList,
  } = useLocalStorageList<CartItem>('cart', []);

  const addToCart = (itemId: string) => {
    addItem({ id: itemId, quantity: 1 }, item => item.id);
  };

  const increaseQuantity = (itemId: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart: (itemId: string) => removeItem(itemId, item => item.id),
        increaseQuantity,
        decreaseQuantity,
        clearCart: () => setItems([]),
        isInCard: (itemId: string) => isItemInList(itemId, item => item.id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
