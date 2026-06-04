import { useLocalStorage } from '@/shared/Hooks';
import { ProductInCart } from '@/shared/type';
import { createContext, useContext, ReactNode, useMemo } from 'react';

type CartContextType = {
  cart: ProductInCart[];
  toggleCartProduct: (id: string) => void;
  setCountCartProduct: (id: string, newValue: number | ((prev: number) => number)) => void;
  deleteCartProduct: (id: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<ProductInCart[]>('cart', []);

  const toggleCartProduct = (id: string) => {
    setCart((prev) => {
      return prev.some((cartProduct) => cartProduct.id === id)
        ? prev.filter((cartProduct) => cartProduct.id !== id)
        : [...prev, { id, count: 1 }];
    });
  };

  const deleteCartProduct = (id: string) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const setCountCartProduct = (id: string, newValue: number | ((prev: number) => number)) => {
    setCart((prevCart) => {
      const func = newValue instanceof Function;

      const copyPrevCart = prevCart.map((product) => {
        if (product.id === id) {
          const newCount = func ? newValue(product.count) : newValue;
          if (newCount < 1) {
            return product;
          }
          return { id, count: newCount };
        } else {
          return product;
        }
      });

      return copyPrevCart;
    });
  };

  const totalItems = useMemo(() => {
    if (!cart) {
      return 1;
    }

    return cart.reduce((prev, current) => {
      return prev + current.count;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, toggleCartProduct, setCountCartProduct, deleteCartProduct, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
