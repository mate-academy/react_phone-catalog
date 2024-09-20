// prettier-ignore
import React, { useMemo, useState, useEffect } from 'react';
import { getPhones } from './services/phones';
import { Phone } from './types/Phone';
import { Tablet } from './types/Tablet';
import { getTablets } from './services/tablets';
import { Accessory } from './types/Accessory';
import { getAccessories } from './services/accessories';
import { getProducts } from './services/products';
import { Product } from './types/Product';
import { productCategory } from './utils/useUnique';
import { useLocaleStorage } from './hooks/useLocaleStorage';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  menuStatus: boolean;
  phonesFromServer: Phone[];
  tabletsFromServer: Tablet[];
  accessoriesFromServer: Accessory[];
  productsFromServer: Product[];
  uniqueProductFromServer: Phone[] | Tablet[] | Accessory[];
  activeIndex: number | null;
  brandNewModels: Phone[] | Tablet[] | Accessory[];
  hotPrisModels: Phone[] | Tablet[] | Accessory[];
  favourites: Phone[] | Tablet[] | Accessory[];
  currentPaginationPage: number;
  cart: Phone[] | Tablet[] | Accessory[];
  setMenuStatus: (value: boolean) => void;
  setPhonesFromServer: (value: Phone[]) => void;
  setTabletsFromServer: (value: Tablet[]) => void;
  setAccessoriesFromServer: (value: Accessory[]) => void;
  setProductsFromServer: (value: Product[]) => void;
  setUniqueProductFromServer: (value: Phone[] | Tablet[] | Accessory[]) => void;
  setActiveIndex: (value: number | null) => void;
  setBrandNewModels: (value: Phone[] | Tablet[] | Accessory[]) => void;
  setHotPriceModels: (value: Phone[] | Tablet[] | Accessory[]) => void;
  addToFavourites: (value: Phone | Tablet | Accessory) => void;
  addToCart: (value: Phone | Tablet | Accessory) => void;
  setCurrentPaginationPage: (value: number) => void;
  setCart: (value: Phone[] | Tablet[] | Accessory[]) => void;
  removeFromCart: (value: Phone | Tablet | Accessory) => void;
};

export const CatalogContext = React.createContext<ContextType>({
  menuStatus: false,
  phonesFromServer: [],
  tabletsFromServer: [],
  accessoriesFromServer: [],
  productsFromServer: [],
  uniqueProductFromServer: [],
  activeIndex: null,
  brandNewModels: [],
  hotPrisModels: [],
  favourites: [],
  currentPaginationPage: 0,
  cart: [],
  setMenuStatus: () => {},
  setPhonesFromServer: () => {},
  setTabletsFromServer: () => {},
  setAccessoriesFromServer: () => {},
  setProductsFromServer: () => {},
  setUniqueProductFromServer: () => {},
  setActiveIndex: () => {},
  setBrandNewModels: () => {},
  setHotPriceModels: () => {},
  addToFavourites: () => {},
  setCurrentPaginationPage: () => {},
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const [phonesFromServer, setPhonesFromServer] = useState<Phone[]>([]);
  const [tabletsFromServer, setTabletsFromServer] = useState<Tablet[]>([]);
  const [accessoriesFromServer, setAccessoriesFromServer] = useState<Accessory[]>([]);
  const [productsFromServer, setProductsFromServer] = useState<Product[]>([]);
  const [uniqueProductFromServer, setUniqueProductFromServer] = useState<Phone[] | Tablet[] | Accessory[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [favourites, setFavourites] = useState<Phone[] | Tablet[] | Accessory[]>(() => {
    const savedFavorites = localStorage.getItem('favourites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cart, setCart] = useLocaleStorage<Phone[] | Tablet[] | Accessory[]>(
    'cart',
    [],
  );

  const [currentPaginationPage, setCurrentPaginationPage] = useState(0);

  const lastYear = productsFromServer
    ?.map(product => product.year)
    .sort((a, b) => b - a)[0];

  const [brandNewModels, setBrandNewModels] = useState<Phone[] | Tablet[] | Accessory[]>([]);
  const [hotPrisModels, setHotPriceModels] = useState<Phone[] | Tablet[] | Accessory[]>([]);

  const getUniqueElements = (elements: Phone[] | Tablet[] | Accessory[]) => {
    let uniqueNames: string[] = [];
    let uniqueElementsFromServer: Phone[] | Tablet[] | Accessory[] = [];

    if (elements) {
      elements.forEach(element => {
        switch (element.category) {
          case productCategory.PHONE:
            phonesFromServer?.forEach(phone => {
              if (!uniqueNames.includes(phone.namespaceId)) {
                const currentElement = elements?.find(
                  item => item.id === phone.id,
                );

                uniqueNames = [...uniqueNames, phone.namespaceId];

                if (currentElement !== undefined) {
                  uniqueElementsFromServer = [
                    ...uniqueElementsFromServer,
                    currentElement,
                  ];
                }
              }
            });
            break;
          case productCategory.TABLET:
            tabletsFromServer?.forEach(tablet => {
              if (!uniqueNames.includes(tablet.namespaceId)) {
                const currentElement = elements?.find(
                  item => item.id === tablet.id,
                );

                uniqueNames = [...uniqueNames, tablet.namespaceId];

                if (currentElement !== undefined) {
                  uniqueElementsFromServer = [
                    ...uniqueElementsFromServer,
                    currentElement,
                  ];
                }
              }
            });
            break;
          default:
            accessoriesFromServer?.forEach(accessory => {
              if (!uniqueNames.includes(accessory.namespaceId)) {
                const currentElement = elements?.find(
                  item => item.id === accessory.id,
                );

                uniqueNames = [...uniqueNames, accessory.namespaceId];

                if (currentElement !== undefined) {
                  uniqueElementsFromServer = [
                    ...uniqueElementsFromServer,
                    currentElement,
                  ];
                }
              }
            });
        }
      });
    }

    return uniqueElementsFromServer;
  };

  useEffect(() => {
    getPhones().then(res => setPhonesFromServer([...res]));
    getTablets().then(res => setTabletsFromServer([...res]));
    getAccessories().then(res => setAccessoriesFromServer([...res]));
    getProducts().then(res => {
      setProductsFromServer([...res]);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));

    if (productsFromServer) {
      const newestFromServerTemp = productsFromServer.filter(
        product =>
          lastYear &&
          (product.year === lastYear || product.year === lastYear - 1),
      );
      const hotPriceTemp = productsFromServer.filter(
        product => product.fullPrice - product.price >= 50,
      );

      const allUniqProduct = [
        ...getUniqueElements(phonesFromServer),
        ...getUniqueElements(tabletsFromServer),
        ...getUniqueElements(accessoriesFromServer),
      ];

      setUniqueProductFromServer([
        ...phonesFromServer,
        ...tabletsFromServer,
        ...accessoriesFromServer,
      ]);

      allUniqProduct.forEach(prod => {
        newestFromServerTemp.forEach(item => {
          if (prod.id === item.itemId) {
            setBrandNewModels(prevState => [...prevState, prod]);
          }
        });
        hotPriceTemp.forEach(item => {
          if (prod.id === item.itemId) {
            setHotPriceModels(prevState => [...prevState, prod]);
          }
        });
      });
    }
  }, [productsFromServer, favourites]);

  const addToFavourites = (product: Phone | Tablet | Accessory) => {
    setFavourites(prevFavourites => {
      if (!Array.isArray(prevFavourites)) {
        return [product];
      }

      if (favourites?.some(item => item.namespaceId === product.namespaceId)) {
        return prevFavourites.filter(
          item => item.namespaceId !== product.namespaceId,
        );
      }

      return [...(prevFavourites as Phone[] | Tablet[] | Accessory[]), product];
    });
  };

  const removeFromCart = (product: Phone | Tablet | Accessory) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const addToCart = (product: Phone | Tablet | Accessory) => {
    setCart([...cart, product]);
  };

  const value = useMemo(
    () => ({
      menuStatus,
      phonesFromServer,
      tabletsFromServer,
      accessoriesFromServer,
      productsFromServer,
      uniqueProductFromServer,
      activeIndex,
      brandNewModels,
      hotPrisModels,
      favourites,
      currentPaginationPage,
      cart,
      setMenuStatus,
      setPhonesFromServer,
      setTabletsFromServer,
      setAccessoriesFromServer,
      setProductsFromServer,
      setActiveIndex,
      setBrandNewModels,
      setHotPriceModels,
      addToFavourites,
      setCurrentPaginationPage,
      setUniqueProductFromServer,
      setCart,
      addToCart,
      removeFromCart,
    }),
    [
      menuStatus,
      phonesFromServer,
      tabletsFromServer,
      accessoriesFromServer,
      productsFromServer,
      activeIndex,
      brandNewModels,
      hotPrisModels,
      currentPaginationPage,
      uniqueProductFromServer,
      cart,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
