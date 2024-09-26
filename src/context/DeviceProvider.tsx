import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from 'react';
import { Accessories, Product, ProductChars } from '../types';

export type DeviceProps = Product | ProductChars | Accessories;

interface DevicesContextType {
  addToFavorites: (device: DeviceProps) => void;
  removeFromFavorites: (deviceId: string) => void;
  addToCart: (device: DeviceProps) => void;
  removeFromCart: (deviceId: string) => void;
  addedDevice: DeviceProps[];
  favoriteDevices: DeviceProps[];
  accessories: Accessories[];
  tablets: ProductChars[];
  phones: ProductChars[];
  products: Product[];
}

const DevicesContext = createContext<DevicesContextType | null>(null);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteDevices, setFavoriteDevices] = useState<DeviceProps[]>([]);
  const [addedDevice, setaddedDevice] = useState<DeviceProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [tablets, setTablets] = useState<ProductChars[]>([]);
  const [phones, setPhones] = useState<ProductChars[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const removeFromCart = (deviceId: string | number) => {
    const uptadeCart = addedDevice.filter(d => d.id !== deviceId);
    const labelId = products.find(pr => pr.id === deviceId);

    setaddedDevice(uptadeCart);
    localStorage.setItem('addedDevice', JSON.stringify(uptadeCart));
    localStorage.setItem(`isAdding_${labelId?.itemId}`, JSON.stringify(false));
  };

  const addToCart = (device: DeviceProps) => {
    const deviceId = device.id || ('itemId' in device && device.itemId);
    const foundDevice = products.find(pro => pro.itemId === deviceId);

    if (addedDevice.some(dev => dev.id === deviceId)) {
      return removeFromCart(device.id);
    } else if (addedDevice.some(dev => dev.id === foundDevice?.id)) {
      if (foundDevice) {
        return removeFromCart(foundDevice.id);
      }
    }

    if (foundDevice) {
      setaddedDevice(prevDevice => {
        const updatedDevices = [...prevDevice, foundDevice];

        localStorage.setItem('addedDevice', JSON.stringify(updatedDevices));

        return updatedDevices;
      });
    } else {
      setaddedDevice(prevDevice => {
        const updatedDevices = [...prevDevice, device];

        localStorage.setItem('addedDevice', JSON.stringify(updatedDevices));

        return updatedDevices;
      });
    }
  };

  const removeFromFavorites = (deviceId: string | number) => {
    const updatedFavorites = favoriteDevices.filter(d => d.id !== deviceId);

    setFavoriteDevices(updatedFavorites);
    localStorage.setItem('favoriteDevices', JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (device: DeviceProps) => {
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

    const devices = localStorage.getItem('addedDevice');

    if (devices) {
      setaddedDevice(JSON.parse(devices));
    }
  }, []);

  useEffect(() => {
    fetch('api/accessories.json')
      .then(response => response.json())
      .then(data => {
        setAccessories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load accessories');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(response => response.json())
      .then(data => {
        setTablets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tablets');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('api/phones.json')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setPhones(data);
      })
      .catch(() => {
        setError('Failed to load phones');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('api/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  return (
    <DevicesContext.Provider
      value={{
        favoriteDevices,
        addToFavorites,
        removeFromFavorites,
        addedDevice,
        addToCart,
        removeFromCart,
        accessories,
        tablets,
        phones,
        products,
      }}
    >
      {loading}
      {error && <div>{error}</div>}
      {children}
    </DevicesContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DevicesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }

  return context;
};
