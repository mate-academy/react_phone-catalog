import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { FavoriteProps } from './FavoriteProvider';

interface ShopCartType {
  addetDevice: FavoriteProps[];
  addToCart: (device: FavoriteProps) => void;
  removeFromCart: (deviceId: string) => void;
}

const ShopingContext = createContext<ShopCartType | null>(null);

export const ShopingProvider = ({ children }: { children: ReactNode }) => {
  const [addetDevice, setAddetDevice] = useState<FavoriteProps[]>([]);

  const removeFromCart = (deviceId: string | number) => {
    const uptadeCart = addetDevice.filter(d => d.id !== deviceId);

    setAddetDevice(uptadeCart);
    localStorage.setItem('addetDevice', JSON.stringify(uptadeCart));
  };

  const addToCart = (device: FavoriteProps) => {
    if (addetDevice.some(dev => dev.id === device.id)) {
      return removeFromCart(device.id);
    } else {
      setAddetDevice([...addetDevice, device]);
    }

    const updatedCarts = JSON.stringify([...addetDevice, device]);

    localStorage.setItem('addetDevice', updatedCarts);
  };

  useEffect(() => {
    const device = localStorage.getItem('addetDevice');

    if (device) {
      setAddetDevice(JSON.parse(device));
    }
  }, []);

  return (
    <ShopingContext.Provider value={{ addetDevice, addToCart, removeFromCart }}>
      {children}
    </ShopingContext.Provider>
  );
};

export const useShoping = () => {
  const context = useContext(ShopingContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }

  return context;
};
