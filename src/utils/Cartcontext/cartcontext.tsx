import { createContext, ReactNode, useContext } from 'react';
import { Products } from '../../types';
import { useLocalStorage } from '../localstorage/localstorage';

//carItem herda as propriedades de products
export interface CartItem extends Products {
  quantity: number;
}
interface HeartItem extends Products {
  amount: number;
}

interface ContextType {
  cart: CartItem[];
  decreaseAmount: (product: Products) => void;
  increaseAmount: (product: Products) => void;
  addToCart: (product: Products) => void;
  addToFavo: (product: Products) => void;
  removeFromCart: (productId: string) => void;
  totalItem: number;
  totalFavo: number;
  favoList: HeartItem[];
  clearCart: () => void;
}

export const CartContext = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('shopping__cart', []);
  const [favoList, setFavoList] = useLocalStorage<HeartItem[]>('favo', []);

  const addToCart = (product: Products) => {
    setCart(prev => {
      const isExist = prev.some(p => p.itemId === product.itemId);

      if (isExist) {
        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseAmount = (product: Products) => {
    setCart(prev => {
      const isExist = prev.some(p => p.itemId === product.itemId);

      if (isExist) {
        return prev.map(item =>
          item.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return prev;
    });
  };

  const decreaseAmount = (product: Products) => {
    setCart(prev => {
      const isExist = prev.some(p => p.itemId === product.itemId);

      if (isExist) {
        return prev.map(item =>
          item.itemId === product.itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      return prev;
    });
  };

  const addToFavo = (product: Products) => {
    setFavoList(prev => {
      const isExist = prev.some(p => p.itemId === product.itemId);

      if (isExist) {
        return prev.filter(p => p.itemId !== product.itemId);
      }

      return [...prev, { ...product, amount: 1 }];
    });
  };

  const clearCart = () => {
    return setCart([]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      return prev.filter(p => p.itemId !== productId);
    });
  };

  const totalItem = cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  ); /*o reduce acessa o array cart, itera por cada objeto atras
  da propriedade quantify. o acc inicialmente é 0 quando somo o acc + item.quantify o acc, por exemplo sera 0 + 1 se o proximo
  quantify for 2 o acc sera 1 + 2 e etc */

  const totalFavo = favoList.reduce((acc, item) => acc + item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        totalItem,
        removeFromCart,
        totalFavo,
        addToFavo,
        favoList,
        increaseAmount,
        decreaseAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve estar dentro de um CartProvider');
  }

  return context;
};
