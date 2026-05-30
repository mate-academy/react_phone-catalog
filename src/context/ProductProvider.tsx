import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { ProductContext } from './ProductContext';
import { getAllProducts } from '../utils/api';

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [products, setProduct] = useState<Product[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState<string[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });
  const addToCart = useCallback((id: string) => {
    setCart(prev => (prev.includes(id) ? prev : [...prev, id]));
  }, []);
  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item !== id));
  }, []);
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);
  const filteredProductsCategory = category
    ? products.filter(item => item.category === category)
    : products;

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    const timeout = setTimeout(() => {
      getAllProducts()
        .then(setProduct)
        .catch(() => {
          setErrorMessage(`There are no ${category} yet`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [category]);

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [favorites, cart]);

  const addFavorite = (id: string) => {
    setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item !== id));
  };

  const filteredCart = [...products].filter(prod => cart.includes(prod.itemId));

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const getQuantity = (itemId: string, operation: string) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;

      if (operation === 'Plus') {
        return { ...prev, [itemId]: current + 1 };
      } else if (operation === 'Minus' && current > 1) {
        return { ...prev, [itemId]: current - 1 };
      }

      return prev;
    });
  };

  const getFinalPrice = (
    product: { year: number; price: number; fullPrice: number },
    count: number,
  ) => {
    return product.year <= 2019
      ? product.price * count
      : product.fullPrice * count;
  };

  const totalPrice = filteredCart.reduce((acc, item) => {
    const count = quantities[item.itemId] || 1;

    return acc + getFinalPrice(item, count);
  }, 0);

  const totalItems = filteredCart.reduce((acc, item) => {
    const count = quantities[item.itemId] || 1;

    return acc + count;
  }, 0);

  return (
    <ProductContext.Provider
      value={{
        products: products,
        setProduct,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
        openMenu,
        setOpenMenu,
        category,
        setCategory,
        filteredProductsCategory,
        cart,
        addToCart,
        removeFromCart,
        addFavorite,
        removeFavorite,
        favorites,
        filteredCart,
        getQuantity,
        getFinalPrice,
        totalPrice,
        totalItems,
        quantities,
        setQuantities,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
