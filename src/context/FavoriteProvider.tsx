import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Accessories, Product, ProductChars } from '../types';

export type FavoriteProps = Product | ProductChars | Accessories;

interface FavoriteContextType {
  favoriteDevices: FavoriteProps[];
  addToFavorites: (device: FavoriteProps) => void;
  removeFromFavorites: (deviceId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteDevices, setFavoriteDevices] = useState<FavoriteProps[]>([]);

  const removeFromFavorites = (deviceId: string | number) => {
    const updatedFavorites = favoriteDevices.filter(d => d.id !== deviceId);

    setFavoriteDevices(updatedFavorites);
    localStorage.setItem('favoriteDevices', JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (device: FavoriteProps) => {
    if (favoriteDevices.some(dev => dev.id === device.id)) {
      return removeFromFavorites(device.id);
    } else {
      setFavoriteDevices([...favoriteDevices, device]);
    }

    const updatedFavorites = JSON.stringify([...favoriteDevices, device]);

    localStorage.setItem('favoriteDevices', updatedFavorites);
  };

  useEffect(() => {
    const device = localStorage.getItem('favoriteDevices');

    if (device) {
      setFavoriteDevices(JSON.parse(device));
    }
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favoriteDevices, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }

  return context;
};
