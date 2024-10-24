import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../utils/getProducts';
import { getProductById } from '../utils/getProductById';
import { MenuItems } from '../modules/constants';
import { getProductsByCategory } from '../utils/getProductsByCategory';
import { ProductItem } from '../types/ProductItem';

type State = {
  showMenu: boolean;
  inDarkMode: boolean;
  products: Product[];
  phones: ProductItem[];
  tablets: ProductItem[];
  accessories: ProductItem[];
  productsInCart: Product[];
  productsInFavorive: Product[];
  loading: boolean;
};

type Action =
  | { type: 'setShowMenu'; payload: boolean }
  | { type: 'setInDarkMode'; payload: boolean }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setPhones'; payload: ProductItem[] }
  | { type: 'setTablets'; payload: ProductItem[] }
  | { type: 'setAccessories'; payload: ProductItem[] }
  | { type: 'setCartProducts'; payload: string }
  | { type: 'setFavoriteProducts'; payload: string }
  | { type: 'setLoading'; payload: boolean };

function addProduct(data: Product[], target: Product) {
  return [...data, target];
}

function removeProduct(data: Product[], target: Product) {
  return [...data.filter(item => item.itemId !== target.itemId)];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setShowMenu':
      return { ...state, showMenu: action.payload };

    case 'setInDarkMode':
      return { ...state, inDarkMode: action.payload };

    case 'setProducts':
      return { ...state, products: action.payload };

    case 'setPhones':
      return { ...state, phones: action.payload };

    case 'setTablets':
      return { ...state, tablets: action.payload };

    case 'setAccessories':
      return { ...state, accessories: action.payload };

    case 'setCartProducts':
      const curProd = getProductById(state.products, action.payload);

      if (curProd) {
        if (
          !state.productsInCart.find(prod => prod.itemId === curProd.itemId)
        ) {
          return {
            ...state,
            productsInCart: addProduct(state.productsInCart, curProd),
          };
        } else {
          return {
            ...state,
            productsInCart: removeProduct(state.productsInCart, curProd),
          };
        }
      }

      break;

    case 'setFavoriteProducts':
      const curFavProd = getProductById(state.products, action.payload);

      if (curFavProd) {
        if (
          !state.productsInFavorive.find(
            prod => prod.itemId === curFavProd.itemId,
          )
        ) {
          return {
            ...state,
            productsInFavorive: addProduct(
              state.productsInFavorive,
              curFavProd,
            ),
          };
        } else {
          return {
            ...state,
            productsInFavorive: removeProduct(
              state.productsInFavorive,
              curFavProd,
            ),
          };
        }
      }

      break;

    case 'setLoading':
      return { ...state, loading: action.payload };
  }

  return { ...state };
}

const initialState: State = {
  showMenu: false,
  inDarkMode: false,
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  productsInCart: [],
  productsInFavorive: [],
  loading: false,
};

export const StateContext = React.createContext(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setLoading', payload: true });

    const prodsPromise = getProducts().then(res => {
      dispatch({ type: 'setProducts', payload: res });
    });

    const phonesPromise = getProductsByCategory(MenuItems.phones).then(res => {
      dispatch({ type: 'setPhones', payload: res });
    });

    const tabletsPromise = getProductsByCategory(MenuItems.tablets).then(
      res => {
        dispatch({ type: 'setTablets', payload: res });
      },
    );

    const accesPromise = getProductsByCategory(MenuItems.accessories).then(
      res => {
        dispatch({ type: 'setAccessories', payload: res });
      },
    );

    Promise.allSettled([
      prodsPromise,
      phonesPromise,
      tabletsPromise,
      accesPromise,
    ]).finally(() => dispatch({ type: 'setLoading', payload: false }));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
