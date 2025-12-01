//---------------------------------------
// 1. IMPORTS
//---------------------------------------
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
  PropsWithChildren,
} from 'react';

//---------------------------------------
// 2. INTERFACE
//---------------------------------------
export interface Product {
  id: string;
  title: string;
  imageSrc?: string;
  price?: string;
  specs?: Record<string, string>;
}

//---------------------------------------
// 3. CONTEXTO E PROVIDER
//---------------------------------------
interface FavoritesContextValue {
  favorites: Product[];
  isFavorite: (id: string) => boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const FavoritesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Carrega favoritos do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // Salva favoritos no localStorage a cada alteração
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some(p => p.id === id),
    [favorites],
  );

  const addFavorite = useCallback((product: Product) => {
    setFavorites(prev => [...prev, product]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

//---------------------------------------
// 4. HOOK DE ACESSO AO CONTEXTO
//---------------------------------------
export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites deve ser usado dentro de um FavoritesProvider',
    );
  }

  return context;
};

//---------------------------------------
// 5. EXPORTAÇÃO
//---------------------------------------
export { FavoritesProvider };
