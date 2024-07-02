import { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItem } from '../../features/cart/types';
import { Products } from '../../types/Products';

type ColorThemeType = {
  theme: string;
  colorThemeToggler: () => void;
};

type FavoritesContextType = {
  favorites: Products[];
  addToFavorites: (newFavorite: Products) => void;
  removeFromFavorites: (itemId: string) => void;
};

type CartContextType = {
  cartProducts: CartItem[];
  addToCart: (newProduct: CartItem) => void;
  removeFromCart: (productId: string) => void;
};

type CategoryContextType = {
  categoryType: string;
  setCategoryType: (category: string) => void;
};

export const ColorThemeContext = createContext<ColorThemeType>(
  {} as ColorThemeType,
);
export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType,
);
export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);
export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType,
);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [categoryType, setCategoryType] = useLocalStorage<string>(
    'category',
    '',
  );
  const [favorites, setFavorites] = useLocalStorage<Products[]>(
    'favorites',
    [],
  );
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');

  const addToFavorites = (newFavorite: Products) => {
    setFavorites([...favorites, newFavorite]);
  };

  const removeFromFavorites = (itemId: string) => {
    const updatedFavorites = favorites.filter(
      favorite => favorite.itemId !== itemId,
    );

    setFavorites(updatedFavorites);
  };

  const colorThemeToggler = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <FavoritesContext.Provider
        value={{ favorites, addToFavorites, removeFromFavorites }}
      >
        <CategoryContext.Provider value={{ categoryType, setCategoryType }}>
          <ColorThemeContext.Provider value={{ theme, colorThemeToggler }}>
            {children}
          </ColorThemeContext.Provider>
        </CategoryContext.Provider>
      </FavoritesContext.Provider>
    </>
  );
};
