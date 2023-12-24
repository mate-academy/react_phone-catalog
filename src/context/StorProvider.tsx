import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { StorContext } from './StorContext';
import { getProducts } from '../services/getProducts';
import { useLocaleStorage } from '../hooks/LocalStorage';
import { CartDetale } from '../types/CartDetale';

type Props = {
  children: React.ReactNode;
};

export const StorProvider: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useLocaleStorage<Product[]>(
    'favorites', [],
  );
  const favCount = favorites.length;
  const [inCart, setInCart] = useLocaleStorage<CartDetale[]>('inCart', []);
  const inCartCount = inCart.length;

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(prod => setProduct(prod))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isSelectedProduct = (
    itemId: string,
    poducts: Product[] | CartDetale[],
  ): boolean => {
    return !!poducts.find((el: Product) => el.itemId === itemId);
  };

  const handleToggleLike = (prod: Product) => {
    if (isSelectedProduct(prod.itemId, favorites)) {
      const newFavorites = favorites.filter(
        (fav: Product) => fav.itemId !== prod.itemId,
      );

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, prod]);
    }
  };

  const handleToggleAddToCart = (item: Product | CartDetale) => {
    const productWidthCount = { ...item, quantity: 1 };

    if (isSelectedProduct(productWidthCount.itemId, inCart)) {
      const newInCart = inCart.filter(
        (cart: Product) => cart.itemId !== item.itemId,
      );

      setInCart(newInCart);
    } else {
      setInCart([...inCart, productWidthCount]);
    }
  };

  const updateCount = (newCount: number, itemId: string) => {
    const newInCart = inCart.map((el: CartDetale) => {
      if (el.itemId === itemId) {
        return { ...el, quantity: newCount };
      }

      return el;
    });

    setInCart(newInCart);
  };

  const value = {
    product,
    loading,
    error,
    favorites,
    favCount,
    handleToggleLike,
    inCart,
    inCartCount,
    handleToggleAddToCart,
    isSelectedProduct,
    updateCount,
  };

  return (
    <StorContext.Provider
      value={value}
    >
      {children}
    </StorContext.Provider>
  );
};
