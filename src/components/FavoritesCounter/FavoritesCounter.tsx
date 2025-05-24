import { useState, useEffect } from 'react';
import './FavoritesCounter.module.scss';

export const FavoritesCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const FAVORITES_KEY = 'favorites';

  const updateCount = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];
    setCount(favorites.length);
  };

  useEffect(() => {
    updateCount();

    const handleStorageChange = () => updateCount();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return <>{count > 0 && <div className="header-counter">{count}</div>}</>;
};
