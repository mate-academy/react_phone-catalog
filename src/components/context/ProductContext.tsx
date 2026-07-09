import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductForCard } from '../../types/ProductForCard';

type CartItem = {
  product: Product;
  quantity: number;
};

type ProductContextType = {
  products: ProductForCard[];
  phones: Product[];
  tablets: Product[];
  accessories: Product[];

  getProductById: (id: string) => Product | undefined;
  getCardProductById: (id: string) => ProductForCard | undefined;

  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;

  cart: CartItem[];
  isInCart: (productId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductForCard[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {
        throw new Error('Error');
      });

    fetch(`${import.meta.env.BASE_URL}api/phones.json`)
      .then(res => res.json())
      .then(setPhones)
      .catch(() => {
        throw new Error('Error');
      });

    fetch(`${import.meta.env.BASE_URL}api/tablets.json`)
      .then(res => res.json())
      .then(setTablets)
      .catch(() => {
        throw new Error('Error');
      });

    fetch(`${import.meta.env.BASE_URL}api/accessories.json`)
      .then(res => res.json())
      .then(setAccessories)
      .catch(() => {
        throw new Error('Error');
      });
  }, []);

  const getProductById = (id: string) => {
    return [...phones, ...tablets, ...accessories].find(
      product => product.id === id,
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const getCardProductById = (id: string) => {
    return [...products].find(product => product.itemId === id);
  };

  const isFavorite = (productId: string) => {
    return favorites.some(p => p.id === productId);
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const changeQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + item.product.priceDiscount * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        phones,
        tablets,
        accessories,
        getProductById,
        getCardProductById,

        favorites,
        toggleFavorite,
        isFavorite,

        cart,
        isInCart,
        addToCart,
        removeFromCart,
        changeQuantity,

        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }

  return context;
};
