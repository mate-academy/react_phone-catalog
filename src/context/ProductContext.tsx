import React, {useEffect, useMemo, useState} from 'react';

import {Products} from '../type/Productes';
import {getProducts} from '../api';
import {PriceList} from '../type/PriceList';
import {useLocaleStorage} from '../hooks/useLocalStorage';

type ProductExistsState = {
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
  setProductExists: React.Dispatch<React.SetStateAction<ProductExistsState>>;
  selectIdCart: ProductExistsState;
  setSelectIdCart: React.Dispatch<React.SetStateAction<ProductExistsState>>;
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
  const [productExists, setProductExists] = useState<ProductExistsState>(null);
  const [priceListLocale, setPriceListLocale] = useLocaleStorage<PriceList[]>(
    'priceList',
    [],
  );
  const [priceList, setPriceList] = useState<PriceList[]>(priceListLocale);
  const [selectIdCart, setSelectIdCart] = useState<ProductExistsState>(null);
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
        setPriceList((prevList: PriceList[]) => {
          const filteredList = prevList.filter(
            p => +p.id !== +selectIdCart?.id,
          );

          return filteredList;
        });

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

        setPriceList(prevList => [...prevList, newPriceListItem]);
      }
    });
  }, [selectIdCart]);

  useEffect(() => {
    getProducts().then((data: Products[]) => {
      setProduct(data);
    });
  }, []);

  useEffect(() => {
    setPriceListLocale(priceList);
  }, [priceList]);

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
