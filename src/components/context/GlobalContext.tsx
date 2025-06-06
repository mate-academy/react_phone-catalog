import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../utils/api';
import { Cart } from '../../types/Cart';

type GlobalContextType = {
  allProducts: Product[];
  setAllProducts: Dispatch<SetStateAction<Product[]>>;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
  favorites: Product[];
  setFavorites: Dispatch<SetStateAction<Product[]>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;
  toggleFavorites: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeCartQuantity: (productId: string, quantity: number) => void;
  emptyCart: () => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  allProducts: [] as Product[],
  setAllProducts: () => {},
  cart: [] as Cart[],
  setCart: () => {},
  favorites: [] as Product[],
  setFavorites: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  toggleMenu: () => {},
  toggleFavorites: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  changeCartQuantity: () => {},
  emptyCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getAllProducts().then(products => setAllProducts(products));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  const toggleFavorites = useCallback(
    (product: Product) => {
      const isFavorite = favorites.some(
        favorite => favorite.itemId === product.itemId,
      );

      setFavorites(prevFavorites => {
        if (isFavorite) {
          return prevFavorites.filter(item => item.itemId !== product.itemId);
        } else {
          return [...prevFavorites, product];
        }
      });
    },
    [favorites, setFavorites],
  );

  const addToCart = useCallback(
    (product: Product) => {
      if (product) {
        const isInCart = cart.some(
          cartProduct => cartProduct.itemId === product.itemId,
        );

        if (!isInCart) {
          const newProduct: Cart = {
            itemId: product.itemId,
            product: product,
            quantity: 1,
          };

          setCart(prevCart => [...prevCart, newProduct]);
        }
      }
    },
    [cart, setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const isInCart = cart.some(
        cartProduct => cartProduct.itemId === productId,
      );

      if (isInCart) {
        setCart(prevCart => prevCart.filter(item => item.itemId !== productId));
      }
    },
    [cart, setCart],
  );

  const changeCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      const isInCart = cart.some(
        cartProduct => cartProduct.itemId === productId,
      );

      if (isInCart) {
        setCart(prevCart =>
          prevCart.map(item => {
            if (item.itemId === productId) {
              return { ...item, quantity: quantity };
            }

            return item;
          }),
        );
      }
    },
    [cart, setCart],
  );

  const emptyCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const value = useMemo(
    () => ({
      allProducts,
      setAllProducts,
      cart,
      setCart,
      favorites,
      setFavorites,
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
      toggleFavorites,
      addToCart,
      removeFromCart,
      changeCartQuantity,
      emptyCart,
    }),
    [
      allProducts,
      cart,
      favorites,
      isMenuOpen,
      toggleFavorites,
      addToCart,
      removeFromCart,
      changeCartQuantity,
      emptyCart,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
