import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { Product } from './types/product';

interface ArrayContextType {
  favoriteProducts: Product[];
  cartProducts: Product[];
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  handleLike: (product: Product) => void;
  handleCart: (product: Product) => void;
}

export const ArrayContext = createContext<ArrayContextType>({
  favoriteProducts: [],
  cartProducts: [],
  setFavoriteProducts: () => {},
  setCartProducts: () => {},
  handleLike: () => {},
  handleCart: () => {},
});

export const ArrayProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem('cartProducts');

    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  function handleLike(product: Product) {
    if (favoriteProducts.map(a => a.id).includes(product.id)) {
      setFavoriteProducts(
        favoriteProducts.filter(item => item.id !== product.id),
      );
    } else {
      setFavoriteProducts([...favoriteProducts, product]);
    }
  }

  function handleCart(product: Product) {
    if (!cartProducts.map(a => a.id).includes(product.id)) {
      setCartProducts([...cartProducts, product]);
    }
  }

  return (
    <ArrayContext.Provider
      value={{
        favoriteProducts,
        cartProducts,
        setFavoriteProducts,
        setCartProducts,
        handleLike,
        handleCart,
      }}
    >
      {children}
    </ArrayContext.Provider>
  );
};

export const useArrayContext = () => {
  const context = useContext(ArrayContext);

  if (!context) {
    throw new Error('useArrayContext must be used within an ArrayProvider');
  }

  return context;
};
