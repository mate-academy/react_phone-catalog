import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { appReducer, CartItem, init, initialState, Item } from './appReducer';
import { createContextHook } from '@shared/helpers/contextProvider';

type GlobalContextType = {
  itemsInFav: Item[];
  itemsInCart: CartItem[];
  favAmount: number;
  cartAmount: number;
  toggleFav: (arg: Item) => void;
  setCart: (arg: CartItem) => void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, init);
  const cartAmount = state.itemsInCart.reduce(
    (sum, { amount }) => sum + amount,
    0,
  );

  const toggleFav = (arg: Item) => {
    dispatch({ type: 'TOGGLE_FAV', payload: arg });
  };

  const setCart = (arg: CartItem) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: arg });
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(state.itemsInFav));
      localStorage.setItem('cart', JSON.stringify(state.itemsInCart));
    }
  }, [state.itemsInFav, state.itemsInCart]);

  const value = {
    itemsInFav: state.itemsInFav,
    itemsInCart: state.itemsInCart,
    favAmount: state.itemsInFav.length,
    cartAmount,
    toggleFav,
    setCart,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalProvider = createContextHook(GlobalContext);

export { useGlobalProvider, GlobalProvider };
