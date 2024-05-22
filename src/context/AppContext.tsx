import { createContext, useCallback, useState } from 'react';
import { Product } from '../types/ProductCard';
import { CartProducts } from '../types/CartProducts';

export type CartContextType = {
  cartProducts: CartProducts;
  addToCart: (product: Product) => void;
  incrementProductInCart: (productId: Product['id']) => void;
  decrementProductInCart: (productId: Product['id']) => void;
  removeFromCart: (productId: Product['id']) => void;
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

  const removeFromCart = (productId: Product['id']) => {
    // If exists, remove it from the cart
    if (productId in cartProducts) {
      setCartProducts((currentCart: CartProducts) => {
        const cartCopy = { ...currentCart };

        delete cartCopy[productId];

        return cartCopy;
      });
    }
  };

  const incrementProductInCart = useCallback((productId: Product['id']) => {
    setCartProducts(currentCart => ({
      ...currentCart,
      [productId]: {
        ...currentCart[productId],
        quantity: currentCart[productId].quantity + 1,
      },
    }));
  }, []);

  // Perform only if current quantity is above 1
  const decrementProductInCart = useCallback(
    (productId: Product['id']) => {
      if (cartProducts[productId].quantity > 1) {
        setCartProducts(currentCart => ({
          ...currentCart,
          [productId]: {
            ...currentCart[productId],
            quantity: currentCart[productId].quantity - 1,
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
      incrementProductInCart(product.id);
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
