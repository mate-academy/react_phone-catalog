import React, { useContext } from 'react';
import { Product } from '../../types/types';
// eslint-disable-next-line max-len
import { useReducerWithLocalStorage } from '../../hooks/useReducerWithLocalStorage';

type HandleProductAdd = (newProduct: Product) => void;
type HandleProductRemove = (id: string) => void;

type FavouritesContextValue = {
  favourites: Product[];
  handleProductAdd: HandleProductAdd;
  handleProductRemove: HandleProductRemove;
};

const FavouritesContext = React.createContext<FavouritesContextValue | null>(
  null,
);

type State = {
  favourites: Product[];
};

type AddProductAction = {
  type: 'addProduct';
  payload: {
    product: Product;
  };
};

type RemoveProductAction = {
  type: 'removeProduct';
  payload: {
    id: string;
  };
};

type Action = AddProductAction | RemoveProductAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addProduct':
      return {
        ...state,
        favourites: [...state.favourites, action.payload.product],
      };
    case 'removeProduct':
      return {
        ...state,
        favourites: state.favourites.filter(
          product => product.itemId !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

export const FavouritesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducerWithLocalStorage<State, Action>(
    'favourites',
    reducer,
    {
      favourites: [],
    },
  );

  const handleProductAdd = (product: Product) =>
    dispatch({ type: 'addProduct', payload: { product } });

  const handleProductRemove = (id: string) =>
    dispatch({ type: 'removeProduct', payload: { id } });

  const value = {
    favourites: state.favourites,
    handleProductAdd,
    handleProductRemove,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const value = useContext(FavouritesContext);

  if (!value) {
    throw new Error('FavouritesProvider is missing!!!');
  }

  return value;
};
