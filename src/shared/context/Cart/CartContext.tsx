import { createContext, ReactNode, useContext } from 'react';
import { ProductPage } from '../../types/ProductPage';
import { useStorageCollection } from '../../hooks/useLocalStorage/useStorageCollection';

type CartItem = ProductPage & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductPage) => void;
  removeFromCart: (id: ProductPage['id']) => void;
  increaseQuantity: (id: ProductPage['id']) => void;
  decreaseQuantity: (id: ProductPage['id']) => void;
  isCart: (id: ProductPage['id']) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { items, setItems, add, remove, exists } =
    useStorageCollection<CartItem>('cart');

  // Définis increaseQuantity AVANT addToCart
  const increaseQuantity = (id: ProductPage['id']) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: ProductPage['id']) => {
    setItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const addToCart = (product: ProductPage) => {
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      increaseQuantity(product.id); // ✅ Maintenant elle est définie
    } else {
      add({ ...product, quantity: 1 });
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart: items,
        addToCart,
        removeFromCart: remove,
        increaseQuantity,
        decreaseQuantity,
        isCart: exists,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
};
