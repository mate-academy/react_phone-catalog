import React, { useState, useMemo } from 'react';
import { CartItem } from '../../types/CartItem';
import { CartContextType } from '../../types/CartContextType';
import { Product } from '../../types/Product';

export const CartContext = React.createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  handleCount: () => {},
  removeItem: () => {},
  totalPrice: 0,
  noItems: false,
  setNoItems: () => {},
  addToCart: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem('products') || '[]'),
  );
  const [noItems, setNoItems] = useState(false);
  const newCartProducts: CartItem[] = [];

  const handleCount = (productId: string, sign: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id === productId) {
        switch (sign) {
          case '+':
            copy.quantity = currentProduct.quantity + 1;
            break;
          case '-':
            copy.quantity = currentProduct.quantity - 1;
            break;
          default:
            break;
        }
      }

      newCartProducts.push(copy);
    });

    localStorage.setItem('products', JSON.stringify(newCartProducts));
    setCartProducts(newCartProducts);
  };

  const removeItem = (productId: string) => {
    cartProducts.forEach(currentProduct => {
      const copy = { ...currentProduct };

      if (currentProduct.id !== productId) {
        newCartProducts.push(copy);
      }
    });

    if (newCartProducts.length === 0) {
      localStorage.removeItem('products');
      setCartProducts([]);
      setNoItems(true);
    } else {
      localStorage.setItem('products', JSON.stringify(newCartProducts));
      setCartProducts(newCartProducts);
      setNoItems(false);
    }
  };

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((accum, next) => {
      return next.quantity * next.product.price + accum;
    }, 0);
  }, [cartProducts]);

  const addToCart = (product: Product) => {
    const newProduct = {
      id: product.id,
      quantity: 1,
      product,
    };

    const addedProducts = localStorage.getItem('products');

    if (addedProducts === null || JSON.parse(addedProducts).length === 0) {
      localStorage.setItem('products', JSON.stringify([newProduct]));
      setCartProducts([newProduct]);

      return;
    }

    let newProducts = JSON.parse(addedProducts);

    const isProductAdded = newProducts
      .some((prod: Product) => prod.id === product?.id);

    if (isProductAdded) {
      newProducts = newProducts
        .filter((prod: Product) => prod.id !== product?.id);
    } else {
      newProducts = [...newProducts, newProduct];
    }

    if (newProducts.length === 0) {
      localStorage.removeItem('products');
      setCartProducts([]);

      return;
    }

    localStorage.setItem('products',
      JSON.stringify(newProducts));

    setCartProducts(newProducts);
  };

  const contextValue: CartContextType = useMemo(() => {
    return {
      cartProducts,
      setCartProducts,
      handleCount,
      removeItem,
      totalPrice,
      noItems,
      setNoItems,
      addToCart,
    };
  }, [cartProducts]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
