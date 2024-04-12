import React, {useEffect, useMemo, useState} from 'react';

import {Products} from '../type/Productes';
import {getProducts} from '../api';
import {PriceList} from '../type/PriceList';
import {useLocaleStorage} from '../hooks/useLocalStorage';

type productExistsState = {
  hasProdPriceList: boolean;
  id: string | number;
} | null;

const defaultContextValues = {
  favourites: [],
  setFavourites: () => {},
  productExists: null,
  setProductExists: () => {},
  selectIdCart: null,
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
  productExists: {
    hasProdPriceList: boolean;
    id: string | number;
  } | null;
  setProductExists: React.Dispatch<React.SetStateAction<productExistsState>>;
  selectIdCart: productExistsState;
  setSelectIdCart: React.Dispatch<React.SetStateAction<productExistsState>>;
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

export const ProductProvider: React.FC<Props> = ({children}) => {
  const [favourites, setFavourites] = useLocaleStorage<Products[]>(
    'favourites',
    [],
  );
  const [productExists, setProductExists] = useState<productExistsState>(null);
  const [priceList, setPriceList] = useLocaleStorage<PriceList[]>(
    'priceList',
    [],
  );
  const [selectIdCart, setSelectIdCart] = useState<productExistsState>(null);
  const [product, setProduct] = useState<Products[]>([]);
  const [visibleProduct, setVisibleProduct] = useLocaleStorage<Products[]>(
    'visibleProduct',
    [],
  );

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      const newProduct = data.find(d => d.id === productExists?.id);

      if (!newProduct) {
        return;
      }

      if (!productExists?.hasProdPriceList) {
        setFavourites([...favourites, newProduct]);
      }

      if (productExists?.hasProdPriceList) {
        setFavourites(favourites.filter(p => p.id !== productExists?.id));
      }
    });
  }, [productExists]);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      if (selectIdCart?.hasProdPriceList) {
        setPriceList(priceList.filter(p => +p.id !== +selectIdCart?.id));

        return;
      }

      const newProduct = data.find(d => d.id === selectIdCart?.id);

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
      productExists,
      setProductExists,
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
    productExists,
    setProductExists,
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
