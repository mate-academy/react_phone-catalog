import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import useLocalStorage from '../hooks/useLocalStorage';

type ProductContextType = {
  favourites: Product[];
  setFavourites: (product: Product[]) => void;
  cart: Product[];
  setCart: (product: Product[]) => void;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  handleClose: () => void;
  handleAddToCart: (prod: Product) => void;
  handleDeleteCart: (prod: Product) => void;
  handleCheckout: () => void;
  totalCount: number;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [isOpen, setIsOpen] = useState(false);

  const totalCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const handleAddToCart = (currentProduct: Product) => {
    let newProduct: Product[];

    if (cart.some(item => item.id === currentProduct.id)) {
      newProduct = cart.filter(prevCart => prevCart.id !== currentProduct.id);
    } else {
      newProduct = [currentProduct, ...cart];
    }

    setCart(newProduct);
  };

  const handleDeleteCart = (product: Product) => {
    const newCart = cart.filter(item => item.id !== product.id);

    setCart(newCart);
  };

  const handleCheckout = () => {
    setCart([]);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const isTablet = window.matchMedia('(min-width: 640px)').matches;

      if (isTablet) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <ProductContext.Provider
      value={{
        favourites,
        setFavourites,
        cart,
        setCart,
        isOpen,
        setIsOpen,
        handleClose,
        handleAddToCart,
        handleDeleteCart,
        handleCheckout,
        totalCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default StoreProvider;

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
};

export { ProductContext };
