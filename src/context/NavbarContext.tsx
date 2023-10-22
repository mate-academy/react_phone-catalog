import React, {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  useMemo,
} from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Product } from '../types/Product';

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
  handleAddFn: (event: React.MouseEvent<HTMLButtonElement>,
    par: Product) => void;
}

export const NavbarContext = createContext<ContextValue>({
  likedDevices: [],
  setLikedDevices: () => {},
  addedDevices: [],
  setAddedDevices: () => {},
  query: '',
  handleQChange: () => {},
  device: '',
  handleAddFn: () => {},
  handleLikeFn: () => {},
});

export const NavbarContextProvider: React.FC<NavbarContextProps> = ({
  children,
}: NavbarContextProps) => {
  const [likedDevices, setLikedDevices] = useState<Product[]>([]);
  const [addedDevices, setAddedDevices] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const handleLikeFn = (e: React.MouseEvent<HTMLButtonElement>,
    product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = likedDevices.some((device) => device.id === product.id);

    if (!isLiked) {
      setLikedDevices((devices) => [...devices, product]);
      localStorage.setItem('liked', `${product.id}`);
    } else {
      setLikedDevices((devices) => devices
        .filter((device) => device.id !== product.id));
      localStorage.removeItem('liked');
    }
  };

  const handleAddFn = (e: React.MouseEvent<HTMLButtonElement>,
    product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = addedDevices.some((device) => device.id === product.id);

    if (!isAdded) {
      setAddedDevices((devices) => [...devices, product]);
      localStorage.setItem('added', `${product.id}`);
    } else {
      setAddedDevices((devices) => devices
        .filter((device) => device.id !== product.id));
      localStorage.removeItem('added');
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
    handleAddFn,
    handleLikeFn,
  };

  return (
    <NavbarContext.Provider value={defaultContextValue}>
      {children}
    </NavbarContext.Provider>
  );
};
