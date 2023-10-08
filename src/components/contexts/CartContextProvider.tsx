import { ReactNode, createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartsItem } from '../../types/CartsItem';

type CartContextType = {
  cart: CartsItem[],
  addToCart: (newProduct: CartsItem) => void,
  removeFromCart: (productId: string) => void,
  changeQuantity: (productId: string, action: Action) => void,
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  changeQuantity: () => { },
});

type Props = {
  children: ReactNode,
};

export enum Action {
  Increase = 'increase',
  Decrease = 'decrease',
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartsItem[]>('cart', []);

  const addToCart = (product: CartsItem) => {
    setCart([
      ...cart,
      product,
    ]);
  };

  const changeQuantity = (productId: string, action: Action) => {
    const newCart = cart.map(item => {
      if (productId === item.id) {
        switch (action) {
          case 'increase':

            return { ...item, quantity: item.quantity + 1 };

          case 'decrease':
            return { ...item, quantity: item.quantity - 1 };

          default: return item;
        }
      }

      return item;
    });

    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    setCart([
      ...cart.filter(item => item.product.itemId !== productId),
    ]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      changeQuantity,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};
