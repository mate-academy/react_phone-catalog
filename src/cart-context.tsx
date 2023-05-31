import { createContext, useState, useEffect } from 'react';
import { Product } from './types/Product';
import { getProducts } from './api';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product | null;
}

interface FavouritesItem {
  id: string;
  product: Product | null;
}

interface ShopContextValue {
  cartItems: CartItem[];
  favouritesItems: FavouritesItem[];
  addToFavourites: (itemId: string) => void;
  removeFromFavourites: (itemId: string) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  increaseAmount: (itemId: string) => void;
  decreaseAmount: (_itemId: string) => void;
}

export const ShopContext = createContext<ShopContextValue>({
  cartItems: [],
  favouritesItems: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  increaseAmount: () => {},
  decreaseAmount: () => {},
});

export const ShopContextProvider = (props: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [favouritesItems, setFavouritesItems] = useState<FavouritesItem[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();

        setProducts(productsData);
      } catch {
        if (!products.length) {
          setProducts([]);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');

    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    const savedFavouritesItems = localStorage.getItem('favouritesItems');

    if (savedFavouritesItems) {
      setFavouritesItems(JSON.parse(savedFavouritesItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favouritesItems', JSON.stringify(favouritesItems));
  }, [favouritesItems]);

  const addToCart = (itemId: string) => {
    if (!cartItems.some((cartItem) => cartItem.id === itemId)) {
      setCartItems([
        ...cartItems,
        {
          id: itemId,
          quantity: 1,
          product: products.find((product) => product.id === itemId) || null,
        },
      ]);
    }
  };

  const increaseAmount = (itemId: string) => {
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }

        return cartItem;
      }),
    );
  };

  const decreaseAmount = (itemId: string) => {
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }

        return cartItem;
      }),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const addToFavourites = (itemId: string) => {
    if (
      !favouritesItems.some((favouritesItem) => favouritesItem.id === itemId)
    ) {
      setFavouritesItems([
        ...favouritesItems,
        {
          id: itemId,
          product: products.find((product) => product.id === itemId) || null,
        },
      ]);
    }
  };

  const removeFromFavourites = (itemId: string) => {
    setFavouritesItems(
      favouritesItems.filter((favouritesItem) => favouritesItem.id !== itemId),
    );
  };

  const contextValue: ShopContextValue = {
    cartItems,
    favouritesItems,
    addToCart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    addToFavourites,
    removeFromFavourites,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
