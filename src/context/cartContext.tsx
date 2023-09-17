import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCart } from '../helpers/Cart';

type Props = {
  addedToCart: number;
  setAddedToCart: Dispatch<SetStateAction<number>>;
};

const CartContext = React.createContext<Props>({
  addedToCart: 0,
  setAddedToCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addedToCart, setAddedToCart] = useState(0);

  useEffect(() => {
    const count = getCart().length;

    setAddedToCart(count);
  }, []);

  const contextValue = {
    addedToCart,
    setAddedToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
