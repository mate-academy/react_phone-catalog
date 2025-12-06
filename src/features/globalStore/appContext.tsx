import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { appReducer, init, initialState } from './appReducer';
import { createContextHook } from '@shared/helpers/contextProvider';
import { CartItem, Item } from './types';

type GlobalDataType = {
  itemsInFav: Item[];
  itemsInCart: CartItem[];
  favAmount: number;
  cartAmount: number;
  modalIsOpened: boolean;
};

type GlobalActionsType = {
  toggleFav: (arg: Item) => void;
  setCart: (arg: CartItem) => void;
  toggleModal: () => void;
  clearCart: () => void;
};

const GlobalDataContext = createContext<GlobalDataType | null>(null);
const GlobalActionsContext = createContext<GlobalActionsType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, init);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(state.itemsInFav));
      localStorage.setItem('cart', JSON.stringify(state.itemsInCart));
    }
  }, [state.itemsInFav, state.itemsInCart]);

  const data = useMemo(
    () => ({
      itemsInFav: state.itemsInFav,
      itemsInCart: state.itemsInCart,
      favAmount: state.itemsInFav.length,
      cartAmount: state.itemsInCart.reduce(
        (sum, { amount }) => sum + amount,
        0,
      ),
      modalIsOpened: state.modalIsOpened,
    }),
    [state.itemsInCart, state.itemsInFav, state.modalIsOpened],
  );

  const actions = useMemo(
    () => ({
      toggleFav: (arg: Item) => {
        dispatch({ type: 'TOGGLE_FAV', payload: arg });
      },
      setCart: (arg: CartItem) => {
        dispatch({ type: 'UPDATE_CART_ITEM', payload: arg });
      },
      toggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [],
  );

  return (
    <GlobalDataContext.Provider value={data}>
      <GlobalActionsContext.Provider value={actions}>
        {children}
      </GlobalActionsContext.Provider>
    </GlobalDataContext.Provider>
  );
};

const useGlobalData = createContextHook(GlobalDataContext);
const useGlobalActions = createContextHook(GlobalActionsContext);

export { useGlobalData, useGlobalActions, GlobalProvider };
