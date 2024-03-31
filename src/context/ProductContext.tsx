import React, { useEffect, useMemo, useState } from 'react';

import { Products } from '../type/Productes';
import { getProducts } from '../api';
import { PriceList } from '../type/PriceList';
import { useLocaleStorage } from '../hooks/useLocalStorage';

const defaultContextValues = {
  favourites: [],
  setFavourites: () => {},
  selectIdFavorit: -1,
  setSelectIdFavorit: () => {},
  selectIdCart: -1,
  setSelectIdCart: () => {},
  priceList: [],
  setPriceList: () => {},
  visibleProduct: [],
  setVisibleProduct: () => {},
  product: [],
  setProduct: () => {},
};

export const ProductContext = React.createContext<{
  favourites: Products[];
  setFavourites: (v: Products[]) => void;
  selectIdFavorit: number;
  setSelectIdFavorit: React.Dispatch<React.SetStateAction<number>>;
  selectIdCart: number;
  setSelectIdCart: React.Dispatch<React.SetStateAction<number>>;
  priceList: PriceList[];
  setPriceList: (v: PriceList[]) => void;
  visibleProduct: Products[];
  setVisibleProduct: (v: Products[]) => void;
  product: Products[];
  setProduct: React.Dispatch<React.SetStateAction<Products[]>>;
}>(defaultContextValues);

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocaleStorage<Products[]>(
    'favourites',
    [],
  );
  const [selectIdFavorit, setSelectIdFavorit] = useState<number>(-1);
  const [priceList, setPriceList] = useLocaleStorage<PriceList[]>(
    'priceList',
    [],
  );
  const [selectIdCart, setSelectIdCart] = useState<number>(-1);
  const [product, setProduct] = useState<Products[]>([]);
  const [visibleProduct, setVisibleProduct] = useLocaleStorage<Products[]>(
    'visibleProduct',
    [],
  );

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const hasElement = () => {
        return (
          favourites.find(item => item.id === selectIdFavorit) !== undefined
        );
      };

      const newProduct = data.find(d => d.id === selectIdFavorit);

      if (newProduct && !hasElement()) {
        setFavourites([...favourites, newProduct]);

        return;
      }

      setFavourites(favourites.filter(p => p.id !== selectIdFavorit));
    });
  }, [selectIdFavorit, setSelectIdFavorit]);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const newProduct = data.find(d => d.id === selectIdCart);

      if (newProduct) {
        const newPriceListItem: PriceList = {
          id: `${newProduct.id}`,
          category: `${newProduct.category}`,
          name: `${newProduct.name}`,
          images: `${newProduct.image}`,
          number: 1,
          price: newProduct.price,
        };

        setPriceList([...priceList, newPriceListItem]);
      }
    });
  }, [selectIdCart]);

  const value = useMemo(() => {
    return {
      favourites,
      setFavourites,
      selectIdFavorit,
      setSelectIdFavorit,
      selectIdCart,
      setSelectIdCart,
      priceList,
      setPriceList,
      visibleProduct,
      setVisibleProduct,
      product,
      setProduct,
    };
  }, [
    favourites,
    setFavourites,
    selectIdFavorit,
    setSelectIdFavorit,
    selectIdCart,
    setSelectIdCart,
    priceList,
    setPriceList,
    visibleProduct,
    setVisibleProduct,
    product,
    setProduct,
  ]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
