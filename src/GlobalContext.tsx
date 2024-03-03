/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from './types/Product';
import { ContextType } from './types/ContextType';
import { getProducts } from './utils/api-phones';
import { useLocalStorage } from './utils/useLocalStorage';
import { CartItem } from './types/CartItem';

export const GlobalContext = React.createContext<ContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  setProducts: () => { },
  setIsLoading: () => { },
  getNewPathname: () => '',
  addRemoveFavList: () => { },
  addRemoveCartList: () => { },
  favList: [],
  cartList: [],
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [localStorage, setLocalStorage] = useLocalStorage<Product[]>(
  //   'cards',
  //   [],
  // );

  // const [localStorage, setLocalStorage] = useLocalStorage<Product[]>('crd', []);
  const [favList, setFavList] = useLocalStorage<Product[]>('fav', []);
  const [cartList, setCartList] = useLocalStorage<CartItem[]>('cart', []);

  // console.log(cartList);

  const phones = products.filter(item => item.category === 'phones');
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');

  function addRemoveFavList(product: Product): void {
    favList.find(fav => fav.id === product.id)
      ? setFavList([...favList].filter(item => item.id !== product.id))
      : setFavList([...favList, product]);
  }

  function addRemoveCartList(item: CartItem): void {
    cartList.find(cartItem => cartItem.product.id === item.product.id)
      ? setCartList([...cartList].filter(i => i.product.id !== item.product.id))
      : setCartList([...cartList, item]);
  }

  function getNewPathname(option: string, index: number): string {
    const pathnameArr = pathname.split('-');

    pathnameArr.splice(index, 1, option).join('-');

    return pathnameArr.join('-');
  }

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => {
        return 'Error';
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    products,
    phones,
    tablets,
    accessories,
    setProducts,
    getNewPathname,
    addRemoveFavList,
    addRemoveCartList,
    favList,
    cartList,
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
