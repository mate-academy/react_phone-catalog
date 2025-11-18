import React, { createContext, useEffect, useState } from 'react';
import { Device } from './types/Device';
import { Products } from './types/Products';
import { getAccessories } from './services/accessories.service';
import { getPhones } from './services/phones.service';
import { getTablets } from './services/tablets.service';
import { getProducts } from './services/products.service';

export interface DevicesContextType {
  accessories: Device[];
  setAccessories: React.Dispatch<React.SetStateAction<Device[]>>;

  phones: Device[];
  setPhones: React.Dispatch<React.SetStateAction<Device[]>>;

  tablets: Device[];
  setTablets: React.Dispatch<React.SetStateAction<Device[]>>;

  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  newModelsPhones: Device[];
  setNewModelsPhones: React.Dispatch<React.SetStateAction<Device[]>>;

  hotPrices: Device[];
  setHotPrices: React.Dispatch<React.SetStateAction<Device[]>>;

  positionShift: number;
  setPositionShift: React.Dispatch<React.SetStateAction<number>>;

  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;

  navMenuList: string[];

  footerMenuList: string[];
}

type Props = {
  children: React.ReactNode;
};

export const DevicesContext = createContext<DevicesContextType | undefined>(
  undefined,
);

export const DevicesProvider: React.FC<Props> = ({ children }) => {
  const [accessories, setAccessories] = useState<Device[]>([]);
  const [phones, setPhones] = useState<Device[]>([]);
  const [tablets, setTablets] = useState<Device[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newModelsPhones, setNewModelsPhones] = useState<Device[]>([]);
  const [hotPrices, setHotPrices] = useState<Device[]>([]);
  const [positionShift, setPositionShift] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navMenuList = ['home', 'phones', 'tablets', 'accessories'];
  const footerMenuList = ['Github', 'Contacts', 'rights'];

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);

      try {
        const [acc, ph, tab, prod] = await Promise.all([
          getAccessories(),
          getPhones(),
          getTablets(),
          getProducts(),
        ]);

        setAccessories(acc);
        setPhones(ph);
        setTablets(tab);
        setProducts(prod);
      } catch (error) {
        console.error('Error loading context data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    if (phones.length > 0) {
      const filterNewModels = () => {
        setNewModelsPhones(
          [...phones].filter(model => model.name.includes('Apple iPhone 14')),
        );
      };

      const sortHotPrices = () => {
        setHotPrices(
          [...phones]
            .sort(
              (model1, model2) =>
                model2.priceRegular -
                model2.priceDiscount -
                (model1.priceRegular - model1.priceDiscount),
            )
            .slice(0, 12),
        );
      };

      filterNewModels();
      sortHotPrices();
    }
  }, [phones]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DevicesContext.Provider
      value={{
        accessories,
        setAccessories,
        phones,
        setPhones,
        tablets,
        setTablets,
        products,
        setProducts,
        isLoading,
        setIsLoading,
        newModelsPhones,
        setNewModelsPhones,
        hotPrices,
        setHotPrices,
        positionShift,
        setPositionShift,
        isMobile,
        setIsMobile,
        navMenuList,
        footerMenuList,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};
