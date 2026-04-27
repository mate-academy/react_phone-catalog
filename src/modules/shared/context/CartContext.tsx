import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { readStorage, writeStorage } from '../services/storage';
import { CartItem, ProductSummary } from '../types/catalog';

interface CartContextValue {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  isInCart: (id: string) => boolean;
  addToCart: (product: ProductSummary) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'phone-catalog-cart';

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, items);
  }, [items]);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalAmount,
        totalQuantity,
        isInCart: id => items.some(item => item.id === id),
        addToCart: product =>
          setItems(currentItems => {
            if (currentItems.some(item => item.id === product.itemId)) {
              return currentItems;
            }

            return [
              ...currentItems,
              { id: product.itemId, quantity: 1, product },
            ];
          }),
        removeFromCart: id =>
          setItems(currentItems => currentItems.filter(item => item.id !== id)),
        updateQuantity: (id, delta) =>
          setItems(currentItems =>
            currentItems.flatMap(item => {
              if (item.id !== id) {
                return item;
              }

              const nextQuantity = item.quantity + delta;

              return nextQuantity > 0
                ? [{ ...item, quantity: nextQuantity }]
                : [];
            }),
          ),
        clearCart: () => setItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
