import React from "react";
import { Product } from "../types/Product";
import { useLocalStorage } from "../helpers/useLocalStorage";

type State = {
  cart: Product[],
  setCart: (products: Product[]) => void,
  addToCart: (product: Product) => void,
  deleteProduct: (productId: number) => void,
  deleteProductCopy: (productId: number) => void,
}

const initialState: State = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  deleteProduct: () => {},
  deleteProductCopy: () => {},
}

export const CartContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];

    setCart(newCart);
  }

  const deleteProduct = (id: number) => {
    const newCart = [...cart.filter(item => item.id !== id)];

    setCart(newCart);
  }

  const deleteProductCopy = (id: number) => {
    const index = cart.findIndex(item => item.id === id);
    const newCart = [...cart];

    newCart.splice(index, 1);

    setCart(newCart);
  };

  const value: State = {
    cart,
    setCart,
    addToCart,
    deleteProduct,
    deleteProductCopy,
  }

  return <CartContext.Provider value={value}>{children}
    </CartContext.Provider>
}
