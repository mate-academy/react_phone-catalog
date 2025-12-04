import { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';
import { Product } from '../../types/Producst';
import { CartProduct } from '../../types/CartProduct';

type ShopContextType = {
  inCart: CartProduct[];
  addItems: (newItems: CartProduct) => void;
  deleteItem: (product: CartProduct) => void;
  clearStorage: () => void;
  changeQuantity: (product: Product, type: 'increase' | 'decrease') => void;
};

export const ShopContext = createContext<ShopContextType | null>(null);

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }

  return context;
};

type Props = {
  children: ReactNode;
};

export const ShopProvider: React.FC<Props> = ({ children }) => {
  const [inCart, setinCart] = useState<CartProduct[]>(() => {
    return JSON.parse(localStorage.getItem('inCart') || '[]');
  });

  const addItems = (newItems: CartProduct) => {
    const existing = JSON.parse(localStorage.getItem('inCart') || '[]');

    existing.push(newItems);

    localStorage.setItem('inCart', JSON.stringify(existing));

    setinCart(existing);
  };

  const deleteItem = (product: Product) => {
    const filtered = inCart.filter(item => item.id !== product.id);

    localStorage.setItem('inCart', JSON.stringify(filtered));
    setinCart(filtered);
  };

  const changeQuantity = (product: Product, type: 'increase' | 'decrease') => {
    const newGoods = inCart.map(item => {
      if (item.id === product.id) {
        type === 'increase' ? item.quantity++ : item.quantity--;
      }

      return item;
    });

    localStorage.setItem('inCart', JSON.stringify(newGoods));
    setinCart(newGoods);
  };

  const clearStorage = () => {
    localStorage.clear();
    setinCart([]);
  };

  return (
    <ShopContext.Provider
      value={{ inCart, addItems, deleteItem, clearStorage, changeQuantity }}
    >
      {children}
    </ShopContext.Provider>
  );
};
