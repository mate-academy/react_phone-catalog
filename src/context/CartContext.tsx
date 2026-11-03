import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface Product {
  id: number | string;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string | number) => boolean;
  totalCount: number;
  totalPrice: number;
}

const LOCAL_STORAGE_KEY = 'nice_gadgets_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const productId = String(product.id);
      const existingItem = prevCart.some(item => item.id === productId);

      if (existingItem) {
        return prevCart;
      }

      return [...prevCart, { id: productId, product, quantity: 1 }];
    });
  };

  const isInCart = (productId: string | number) => {
    const idString = String(productId);

    return cart.some(item => item.id === idString);
  };

  const removeFromCart = (productId: string | number) => {
    const idString = String(productId);

    setCart(prevCart => prevCart.filter(item => item.id !== idString));
  };

  const changeQuantity = (productId: string | number, quantity: number) => {
    const idString = String(productId);

    if (quantity <= 0) {
      removeFromCart(idString);

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === idString ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        isInCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart should be used inside <CartProvider>');
  }

  return context;
};
