import React, { useEffect, useMemo, useState } from 'react';

import { Products } from '../type/Productes';
import { getProducts } from '../api';
import { PriceList } from '../type/PriceList';

export const ProductContext = React.createContext<{
  favourites: Products[];
  setFavourites: React.Dispatch<React.SetStateAction<Products[]>>;
  selectIdFavorit: number;
  setSelectIdFavorit: React.Dispatch<React.SetStateAction<number>>;
  selectIdCart: number;
  setSelectIdCart: React.Dispatch<React.SetStateAction<number>>;
  priceList: PriceList[];
  setPriceList: React.Dispatch<React.SetStateAction<PriceList[]>>;
}>({
  favourites: [],
  setFavourites: () => {},
  selectIdFavorit: -1,
  setSelectIdFavorit: () => {},
  selectIdCart: -1,
  setSelectIdCart: () => {},
  priceList: [],
  setPriceList: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<Products[]>([]);
  const [priceList, setPriceList] = useState<PriceList[]>([]);
  const [selectIdFavorit, setSelectIdFavorit] = useState<number>(-1);
  const [selectIdCart, setSelectIdCart] = useState<number>(-1);
  const [prevId, setPrevId] = useState<number>(-1);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const newProduct = data.find(d => d.id === selectIdFavorit);

      if (newProduct) {
        setFavourites((prevState: Products[]) => [...prevState, newProduct]);
        setPrevId(selectIdFavorit);

        return;
      }

      if (selectIdFavorit === -1) {
        setFavourites((prevState: Products[]) =>
          prevState.filter(product => product.id !== prevId),
        );
        setPrevId(selectIdFavorit);
      }
    });
  }, [selectIdFavorit, setSelectIdFavorit]);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const newProduct = data.find(d => d.id === selectIdCart);

      if (newProduct) {
        setPriceList((prevState: PriceList[]) => [
          ...prevState,
          { id: +newProduct.id, number: 1 },
        ]);
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
  ]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
