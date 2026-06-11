import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (productId: string, productName?: string) => void;
  isFavorite: (productId: string) => boolean;
  notification: string | null;
  error: string | null;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorites_ids');
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('favorites_ids', JSON.stringify(favoriteIds));

      setError(null);
    } catch {
      setError('Failed to save favorites');
    }
  }, [favoriteIds]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const toggleFavorite = (productId: string, productName?: string) => {
    if (!productId) {
      return;
    }

    setFavoriteIds(prev => {
      const isAdded = prev.includes(productId);

      const updated = isAdded
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      const nameSnippet = productName ? `"${productName}"` : 'Product';

      if (isAdded) {
        setNotification(`${nameSnippet} removed from favorites`);
      } else {
        setNotification(`${nameSnippet} added to favorites`);
      }

      return updated;
    });
  };

  const isFavorite = (productId: string) => {
    if (!productId) {
      return false;
    }

    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        notification,
        error,
      }}
    >
      {children}

      {notification && (
        <div className="fav-notification">
          <div className="fav-notification__content">{notification}</div>
        </div>
      )}

      {error && (
        <div className="fav-notification fav-notification--error">
          <div className="fav-notification__content">{error}</div>
        </div>
      )}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    return {
      favoriteIds: [],
      toggleFavorite: () => {},
      isFavorite: () => false,
      notification: null,
      error: null,
    };
  }

  return context;
};
