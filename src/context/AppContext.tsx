import { createContext, useCallback, useState } from 'react';
import { Product } from '../types/ProductCard';
import { CartProducts } from '../types/CartProducts';

export type CartContextType = {
  cartProducts: CartProducts;
  addToCart: (product: Product) => void;
  incrementProductInCart: (product: Product) => void;
  decrementProductInCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
};

export const CartContext = createContext<CartContextType>({
  cartProducts: {},
  addToCart: () => {},
  incrementProductInCart: () => {},
  decrementProductInCart: () => {},
  removeFromCart: () => {},
});

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<CartProducts>({});

  const removeFromCart = (product: Product) => {
    // If exists, remove it from the cart
    if (product.id in cartProducts) {
      setCartProducts((currentCart: CartProducts) => {
        const cartCopy = { ...currentCart };

        delete cartCopy[product.id];

        return cartCopy;
      });
    }
  };

  const incrementProductInCart = useCallback((product: Product) => {
    setCartProducts(currentCart => ({
      ...currentCart,
      [product.id]: {
        ...currentCart[product.id],
        quantity: currentCart[product.id].quantity + 1,
      },
    }));
  }, []);

  // Perform only if current quantity is above 1
  const decrementProductInCart = useCallback(
    (product: Product) => {
      if (cartProducts[product.id].quantity > 1) {
        setCartProducts(currentCart => ({
          ...currentCart,
          [product.id]: {
            ...currentCart[product.id],
            quantity: currentCart[product.id].quantity - 1,
          },
        }));
      }
    },
    [cartProducts],
  );

  const addFirstToCart = (product: Product) => {
    setCartProducts((currentCart: CartProducts) => ({
      ...currentCart,
      [product.id]: {
        product: product,
        quantity: 1,
      },
    }));
  };

  const addToCart = (product: Product) => {
    // If exists, increment the quantity
    if (product.id in cartProducts) {
      incrementProductInCart(product);
    } else {
      addFirstToCart(product);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        incrementProductInCart,
        decrementProductInCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
