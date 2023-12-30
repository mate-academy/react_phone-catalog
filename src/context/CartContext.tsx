import React, { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';
import { CartItemType } from '../types/CartItemType';

type CartContextType = {
  cart: CartItemType[],
  setCart: (value: CartItemType[]) => void,
  handleAddToCart: (newProduct: Product) => void,
  removeFromCart: (productId: string) => void,
  increaseQuantity: (productId: string) => void,
  decreaseQuantity: (productId: string) => void,
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => { },
  handleAddToCart: () => { },
  removeFromCart: () => { },
  increaseQuantity: () => { },
  decreaseQuantity: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType>('cart', []);

  function handleAddToCart(newProduct: Product) {
    if (cart.find(item => item.product.itemId === newProduct.itemId)) {
      setCart(
        [...cart].filter(item => item.product.itemId !== newProduct.itemId),
      );
    } else {
      setCart([...cart, {
        quantity: 1,
        product: newProduct,
      },
      ]);
    }
  }

  const removeFromCart = (productId: string) => setCart(
    cart.filter(
      item => item.product.itemId !== productId,
    ),
  );

  const increaseQuantity = (productId: string) => {
    const cartCopy = [...cart];

    const currentProduct = cartCopy
      .find(item => item.product.itemId === productId);

    if (currentProduct) {
      currentProduct.quantity += 1;
      setCart(cartCopy);
    }
  };

  const decreaseQuantity = (productId: string) => {
    const cartCopy = [...cart];

    const currentProduct = cartCopy
      .find(item => item.product.itemId === productId);

    if (currentProduct) {
      currentProduct.quantity -= 1;
      setCart(cartCopy);
    }
  };

  const value = ({
    cart,
    setCart,
    handleAddToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  });

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
