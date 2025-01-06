import { createContext, useContext, useState, ReactNode } from 'react';
import { CartProduct } from '../../types/CartProduct';

interface ProductsContextProps {
  favourites: CartProduct[];
  shoppingBag: CartProduct[];
  addToFavourites: (product: CartProduct) => void;
  removeFromFavourites: (productId: string) => void;
  addToShoppingBag: (product: CartProduct) => void;
  removeFromShoppingBag: (productId: string) => void;
  setShoppingBag: (shoppingBag: CartProduct[]) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [favourites, setFavourites] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem('favourites') || '[]'),
  );

  const [shoppingBag, setShoppingBag] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem('shoppingBag') || '[]'),
  );

  const addToFavourites = (product: CartProduct) => {
    const updatedFavourites = [...favourites, product];

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const removeFromFavourites = (productId: string) => {
    const updatedFavourites = favourites.filter(
      (item: CartProduct) => item.id !== productId,
    );

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const addToShoppingBag = (product: CartProduct) => {
    const newProduct = { ...product, count: 1 };
    const updatedShoppingBag = [...shoppingBag, newProduct];

    setShoppingBag(updatedShoppingBag);
    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  const removeFromShoppingBag = (productId: string) => {
    const updatedShoppingBag = shoppingBag.filter(
      (item: CartProduct) => item.id !== productId,
    );

    setShoppingBag(updatedShoppingBag);
    localStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingBag));
  };

  return (
    <ProductsContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        shoppingBag,
        setShoppingBag,
        addToShoppingBag,
        removeFromShoppingBag,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
