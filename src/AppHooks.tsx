import React, { createContext, useContext, useState } from 'react';
import { DeviceShort } from './types/DeviceShort';
import { DeviceFull } from './types/DeviceFull';
// import { Accessorie } from './types/Accessorie';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  allProducts: DeviceShort[];
  setAllProducts: React.Dispatch<React.SetStateAction<DeviceShort[]>>;
  newProducts: DeviceShort[];
  setNewProducts: React.Dispatch<React.SetStateAction<DeviceShort[]>>;
  hotProducts: DeviceShort[];
  setHotProducts: React.Dispatch<React.SetStateAction<DeviceShort[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  items: string;
  setItems: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  devicesOnPage: DeviceShort[];
  setDevicesOnPage: React.Dispatch<React.SetStateAction<DeviceShort[]>>;
  favourites: DeviceShort[];
  setFavourites: React.Dispatch<React.SetStateAction<DeviceShort[]>>;
  cartItems: [DeviceShort, number][];
  setCartItems: React.Dispatch<React.SetStateAction<[DeviceShort, number][]>>;
  currentDevice: DeviceFull | null;
  setCurrentDevice: React.Dispatch<React.SetStateAction<DeviceFull | null>>;
};

const HooksContext = createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [allProducts, setAllProducts] = useState<DeviceShort[]>([]);
  const [newProducts, setNewProducts] = useState<DeviceShort[]>([]);
  const [hotProducts, setHotProducts] = useState<DeviceShort[]>([]);
  const [devicesOnPage, setDevicesOnPage] = useState<DeviceShort[]>([]);
  const [favourites, setFavourites] = useState<DeviceShort[]>([]);
  const [cartItems, setCartItems] = useState<Array<[DeviceShort, number]>>([]);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState('');
  const [sort, setSort] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceFull | null>(null);
  // const [categoryDevices, setCategoryDevices] = useState<DeviceFull[]>([]);

  return (
    <HooksContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        allProducts,
        setAllProducts,
        newProducts,
        setNewProducts,
        hotProducts,
        setHotProducts,
        page,
        setPage,
        items,
        setItems,
        sort,
        setSort,
        devicesOnPage,
        setDevicesOnPage,
        favourites,
        setFavourites,
        cartItems,
        setCartItems,
        openModal,
        setOpenModal,
        currentDevice,
        setCurrentDevice,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const UseHooks = (): ContextProps => {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
