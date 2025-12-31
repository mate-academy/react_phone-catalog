import { createContext, useEffect, useState } from 'react';
import { useSavedItems } from '../hooks/useSavedItems';
import { Product, ProductWithQuantity } from '../types/Product';
import { getProducts } from '../utils/fetchClient';

type CartContextType = {
  cart: { itemId: string; quantity: number }[];
  cartProducts: ProductWithQuantity[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, diff: number) => void;
  totalQuantity: number;
  totalPrice: number;
  clearCart: () => void;
};

export type CartItem = {
  itemId: string;
  quantity: number;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartProducts: [],
  addToCart: () => {},
  removeFromCart: () => {},
  changeQuantity: () => {},
  totalQuantity: 0,
  totalPrice: 0,
  clearCart: () => {},
});

type Props = { children: React.ReactNode };

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useSavedItems<CartItem[]>('cart', []);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts<Product[]>('/api/products.json').then(productsFromServer => {
      setProducts(productsFromServer);
    });
  }, []);

  const cartProducts: ProductWithQuantity[] = cart.map(ci => ({
    ...products.find(p => p.itemId === ci.itemId)!,
    quantity: ci.quantity,
  }));

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = cartProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const addToCart = (id: string) => {
    const existing = cart.find(item => item.itemId === id);

    if (existing) {
      setCart(cart);
    } else {
      setCart([...cart, { itemId: id, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.itemId !== id));
  };

  const changeQuantity = (id: string, number: number) => {
    setCart(
      cart.map(item =>
        item.itemId === id
          ? { ...item, quantity: Math.max(1, item.quantity + number) }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartProducts,
        addToCart,
        removeFromCart,
        changeQuantity,
        totalQuantity,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
