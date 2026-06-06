import { createContext } from 'react';
import { Products } from '../../types/Products';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export type CartItems = {
  id: number;
  quantity: number;
  product: Products;
};

export type CartItemContext = {
  cartItems: CartItems[];
  addToCart: (product: Products) => void;
  removeFromCart: (id: number) => void;
  changeQuntity: (id: number, val: number) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartItemContext>({
  cartItems: [],
  addToCart: () => {},
  changeQuntity: () => {},
  removeFromCart: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItems[]>(
    'cartItems',
    [],
  );

  const changeQuntity = (id: number, val: number) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + val,
          };
        }

        return item;
      }),
    );
  };

  const addToCart = (product: Products) => {
    const exist = cartItems.some(item => item.id === product.id);
    const newProd = {
      id: product.id,
      quantity: 1,
      product,
    };

    if (exist) {
      return;
    } else {
      setCartItems([...cartItems, newProd]);
    }
  };

  const removeFromCart = (prodId: number) => {
    const newItemsCart = cartItems.filter(item => item.id !== prodId);

    setCartItems(newItemsCart);
  };

  const contextValue: CartItemContext = {
    cartItems,
    addToCart,
    changeQuntity,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
