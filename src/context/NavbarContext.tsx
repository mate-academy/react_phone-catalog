import React, {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Product } from '../types/Product';
import { URL_PRODUCTS } from '../helpers/Url';

interface NavbarContextProps {
  children: ReactNode;
}

interface ContextValue {
  likedDevices: Product[];
  setLikedDevices: Dispatch<SetStateAction<Product[]>>;
  addedDevices: Product[];
  setAddedDevices: Dispatch<SetStateAction<Product[]>>;
  query: string;
  handleQChange: (event: ChangeEvent<HTMLInputElement>) => void;
  device: string;
  handleLikeFn: (event: React.MouseEvent<HTMLButtonElement>,
    par: Product) => void;
  handleAddToCartFn: (event: React.MouseEvent<HTMLButtonElement>,
    par: Product) => void;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const NavbarContext = createContext<ContextValue>({
  likedDevices: [],
  setLikedDevices: () => {},
  addedDevices: [],
  setAddedDevices: () => {},
  query: '',
  handleQChange: () => {},
  device: '',
  handleAddToCartFn: () => {},
  handleLikeFn: () => {},
  products: [],
  setProducts: () => {},
});

export const NavbarContextProvider: React.FC<NavbarContextProps> = ({
  children,
}: NavbarContextProps) => {
  const [likedDevices, setLikedDevices] = useState<Product[]>([]);
  const [addedDevices, setAddedDevices] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();

    setProducts(data);
  };

  const getAddedToCardProducts = () => {
    if (products.length) {
      const addedDevicesId = Object.entries(localStorage)
        .filter((device) => device[1] === 'added')
        .map((dev) => dev[0])
        .map((d) => {
          const index = d.indexOf('-');

          return d.slice(index + 1);
        });
      const filteredAddedDevices = products
        .filter((device: Product) => addedDevicesId.includes(device.id));

      setAddedDevices(filteredAddedDevices);
    }
  };

  const getLikedProducts = () => {
    if (products.length) {
      const likedDevicesId = Object.entries(localStorage)
        .filter((device) => device[1] === 'liked')
        .map((dev) => dev[0])
        .map((d) => {
          const index = d.indexOf('-');

          return d.slice(index + 1);
        });
      const filteredLikedDevices = products
        .filter((device: Product) => likedDevicesId.includes(device.id));

      setLikedDevices(filteredLikedDevices);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getAddedToCardProducts();
    getLikedProducts();
  }, [products.length]);

  const handleLikeFn = (e: React.MouseEvent<HTMLButtonElement>,
    product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = likedDevices.some((device) => device.id === product.id);

    if (!isLiked) {
      setLikedDevices((devices) => [...devices, product]);
      localStorage.setItem(`likedProduct-${product.id}`, 'liked');
    } else {
      setLikedDevices((devices) => devices
        .filter((device) => device.id !== product.id));
      localStorage.removeItem(`likedProduct-${product.id}`);
    }
  };

  const handleAddToCartFn = (e: React.MouseEvent<HTMLButtonElement>,
    product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = addedDevices.some((device) => device.id === product.id);

    if (!isAdded) {
      setAddedDevices((devices) => [...devices, product]);
      localStorage.setItem(`addedProduct-${product.id}`, 'added');
      localStorage.setItem(product.id, '1');
    } else {
      setAddedDevices((devices) => devices
        .filter((device) => device.id !== product.id));
      localStorage.removeItem(`addedProduct-${product.id}`);
      localStorage.removeItem(product.id);
    }
  };

  const device = useMemo(() => {
    const hasPhones = pathname.includes('phones');
    const hasTablets = pathname.includes('tablets');
    const hasAccessories = pathname.includes('accessories');
    const hasFavourites = pathname.includes('favourites');
    let res;

    if (hasPhones) {
      res = 'phones';
    } else if (hasTablets) {
      res = 'tablets';
    } else if (hasAccessories) {
      res = 'accessories';
    } else if (hasFavourites) {
      res = 'favourites';
    } else {
      res = '';
    }

    return res;
  }, [pathname]);

  const query = searchParams.get('query') || '';

  const handleQChange = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const defaultContextValue: ContextValue = {
    likedDevices,
    setLikedDevices,
    addedDevices,
    setAddedDevices,
    query,
    handleQChange,
    device,
    handleAddToCartFn,
    handleLikeFn,
    products,
    setProducts,
  };

  return (
    <NavbarContext.Provider value={defaultContextValue}>
      {children}
    </NavbarContext.Provider>
  );
};
