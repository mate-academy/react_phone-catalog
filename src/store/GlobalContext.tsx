import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import { getAllProducts } from '../utils/fetchRequests';
import { useLocalStorage } from '../utils/localStorage';

type GlobalContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearShoppingCart: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  toggleFavorites: (currentProduct: Product) => void;
  addToCart: (currentProduct: Product) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [] as Product[],
  setProducts: () => {},
  cart: [] as CartProduct[],
  setCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  updateQuantity: () => {},
  clearShoppingCart: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  toggleFavorites: () => {},
  addToCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useLocalStorage<CartProduct[]>('shoppingCart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllProducts = () => {
      getAllProducts()
        .then(fetchedProducts => {
          setProducts(fetchedProducts);
        })
        .catch(error => {
          throw new Error(`Error fetching products: ${error.message}`);
        })
        .finally(() => {
          // ЧТО ЗДЕСЬ НАПИСАТЬ???
        });
    };

    fetchAllProducts();
  }, []);

  const updateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      setCart(prevCart => {
        const updatedShoppingCart = prevCart
          .map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          )
          .filter(item => item.quantity > 0);

        return updatedShoppingCart;
      });
    },
    [setCart],
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const addToCart = useCallback(
    (product: Product) => {
      if (product) {
        const isInCart = cart.some(
          item => item.product.itemId === product.itemId,
        );

        if (!isInCart) {
          const newProduct: CartProduct = {
            id: product.itemId,
            quantity: 1,
            product: product,
          };

          setCart(prevCart => [...prevCart, newProduct]);
        }
      }
    },
    [cart, setCart],
  );

  // const toggleFavorites = useCallback(
  //   (currentProduct: Product) => {
  //     const isInFavorites = favorites.some(
  //       item => item.itemId === currentProduct.itemId,
  //     );

  //     if (isInFavorites) {
  //       setFavorites(prevFavorites =>
  //         prevFavorites.filter(item => item.itemId !== currentProduct.itemId),
  //       );
  //     } else {
  //       setFavorites(prevFavorites => [...prevFavorites, currentProduct]);
  //     }
  //   },
  //   [favorites, setFavorites],
  // );

  const toggleFavorites = useCallback(
    (currentProduct: Product) => {
      const isInFavorites = favorites.some(
        item => item.itemId === currentProduct.itemId,
      );

      setFavorites(prevFavorites => {
        if (isInFavorites) {
          return prevFavorites.filter(
            item => item.itemId !== currentProduct.itemId,
          );
        } else {
          return [...prevFavorites, currentProduct];
        }
      });
    },
    [favorites, setFavorites],
  );

  const clearShoppingCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const data = useMemo(
    () => ({
      products,
      setProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      updateQuantity,
      clearShoppingCart,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
    }),
    [
      products,
      cart,
      favorites,
      setProducts,
      setCart,
      setFavorites,
      clearShoppingCart,
      updateQuantity,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
    ],
  );

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
