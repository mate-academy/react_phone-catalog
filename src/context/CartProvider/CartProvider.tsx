import { createContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type Props = {
  children: React.ReactNode;
};

export interface CartProduct extends Product {
  quantity: number;
}

interface CartProductsContextType {
  cartProducts: CartProduct[];
  addCartProducts: (product: Product) => void;
  removeCartProduct: (itemId: string) => void;
  changeQuantityOfProduct: (itemId: string, action: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartProductsContextType>({
  cartProducts: [],
  addCartProducts: () => {},
  removeCartProduct: () => {},
  changeQuantityOfProduct: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const savedCartProducts = localStorage.getItem('cartProducts');

    if (savedCartProducts) {
      setCartProducts(JSON.parse(savedCartProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addCartProducts = (product: Product) => {
    setCartProducts(prevCartProducts => {
      return [...prevCartProducts, { ...product, quantity: 1 }];
    });
  };

  const removeCartProduct = (itemId: string) => {
    setCartProducts(prevCartProducts => {
      return prevCartProducts.filter(product => product.itemId !== itemId);
    });
  };

  const changeQuantityOfProduct = (itemId: string, action: string) => {
    setCartProducts(prevCartProducts => {
      return prevCartProducts.map(cartProduct => {
        if (cartProduct.itemId === itemId) {
          let count = cartProduct.quantity;

          switch (action) {
            case 'increment':
              count++;
              break;

            case 'decrement':
              count--;
              break;
          }

          return { ...cartProduct, quantity: count };
        }

        return cartProduct;
      });
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addCartProducts,
        removeCartProduct,
        changeQuantityOfProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
