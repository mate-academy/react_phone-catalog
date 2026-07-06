import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ProductsState = {
  products: Product[];
  loading: boolean;
  errorMessage: boolean;
};

type Action =
  | { type: 'set_products'; payload: Product[] }
  | { type: 'set_loading'; payload: boolean }
  | { type: 'set_errorMessage'; payload: boolean }
  | { type: 'toggle_favorite'; payload: { id: string } };

const initialState: ProductsState = {
  products: [],
  loading: false,
  errorMessage: false,
};

function reducer(state: ProductsState, action: Action): ProductsState {
  switch (action.type) {
    case 'set_products':
      return {
        ...state,
        products: action.payload,
      };

    case 'set_loading':
      return {
        ...state,
        loading: action.payload,
      };

    case 'set_errorMessage':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'toggle_favorite':
      const { id } = action.payload;

      return {
        ...state,
        products: state.products.map(product => {
          if (product.itemId !== id) {
            return product;
          }

          if ('isFavorite' in product) {
            const { isFavorite, ...rest } = product;

            return rest;
          }

          return {
            ...product,
            isFavorite: true,
          };
        }),
      };

    default:
      return state;
  }
}

export const ProductsStateContext = React.createContext(initialState);

export const ProductDispatchContext = React.createContext(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (action: Action) => {},
);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'set_loading', payload: true });
    dispatch({ type: 'set_errorMessage', payload: false });

    getProducts()
      .then(products => {
        const productsWithFavorites = products.map(product => ({
          ...product,
          ...(favorites.includes(product.itemId) && { isFavorite: true }),
        }));

        dispatch({ type: 'set_products', payload: productsWithFavorites });
      })
      .catch(() => {
        dispatch({ type: 'set_errorMessage', payload: true });
      })
      .finally(() => {
        dispatch({ type: 'set_loading', payload: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //зберігаємо улюблені в локас стейті
  useEffect(() => {
    const favoriteIds = state.products
      .filter(product => 'isFavorite' in product)
      .map(product => product.itemId);

    // якщо нічого не змінилось — навіть не викликаємо setFavorites
    if (JSON.stringify(favorites) === JSON.stringify(favoriteIds)) {
      return;
    }

    setFavorites(favoriteIds);
  }, [state.products, setFavorites, favorites]);

  return (
    <ProductsStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
};
