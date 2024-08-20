import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/api';
import { useLocalStorage } from '../hooks/useLocaleStorage';
import * as Types from '../types';
import * as Service from '../utils/service';
import { useSearchParams } from 'react-router-dom';

export const CatalogContext = React.createContext<Types.CatalogContextType>({
  allProducts: [],
  favourites: [],
  cart: [],
  totalCartQuantity: null,
  totalCheckout: null,
  menuIsActive: false,
  checkoutIsClicked: false,
  query: '',
  setQuery: () => {},
  handleLinkClick: () => {},
  addProductToFavoutites: () => {},
  addProductToCart: () => {},
  setCart: () => {},
  setCheckoutIsClicked: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Types.Product[]>([]);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const [favourites, setFavourites] = useLocalStorage<Types.Product[]>(
    'favourites',
    [],
  );
  const [cart, setCart] = useLocalStorage<Types.CartProduct[]>('cart', []);
  const totalCartQuantity = cart.reduce(
    (sum, { quantity }) => sum + quantity,
    0,
  );
  const totalCheckout = cart.reduce(
    (checkout, { quantity, product }) => checkout + quantity * product.price,
    0,
  );

  const addProductToFavoutites = useCallback(
    (product: Types.Product) => {
      setFavourites(currentFavourites => {
        return !currentFavourites.some(({ id }) => id === product.id)
          ? [...currentFavourites, product]
          : currentFavourites.filter(({ id }) => id !== product.id);
      });
    },
    [setFavourites],
  );

  const addProductToCart = useCallback(
    (cartProduct: Types.CartProduct, operation?: Types.Operation) => {
      setCart(currentCart => {
        if (!currentCart.some(({ id }) => cartProduct.id === id)) {
          return [...currentCart, cartProduct];
        } else {
          switch (operation) {
            case undefined:
              return Service.operationDo(currentCart, cartProduct);
            default:
              return Service.operationDo(currentCart, cartProduct, operation);
          }
        }
      });
    },
    [setCart],
  );

  const [menuIsActive, setMenuIsActive] = useState(false);
  const [checkoutIsClicked, setCheckoutIsClicked] = useState(false);

  const handleLinkClick = useCallback(
    (enableMenu: boolean) => {
      setMenuIsActive(enableMenu);
      if (!menuIsActive) {
        Service.scrollWindowTop();
      }
    },
    [menuIsActive],
  );

  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(currentQuery);

  const catalogValues = useMemo(
    () => ({
      allProducts,
      favourites,
      cart,
      totalCartQuantity,
      totalCheckout,
      menuIsActive,
      checkoutIsClicked,
      query,
      setQuery,
      handleLinkClick,
      addProductToFavoutites,
      addProductToCart,
      setCart,
      setCheckoutIsClicked,
    }),
    [
      allProducts,
      favourites,
      cart,
      totalCartQuantity,
      totalCheckout,
      menuIsActive,
      checkoutIsClicked,
      query,
      setQuery,
      handleLinkClick,
      addProductToFavoutites,
      addProductToCart,
      setCart,
    ],
  );

  return (
    <CatalogContext.Provider value={catalogValues}>
      {children}
    </CatalogContext.Provider>
  );
};
