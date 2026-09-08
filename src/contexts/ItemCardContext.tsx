import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchData } from '../utils/hooks/useFetchData';
import { ItemCard } from '../types/ItemCard';

export type ItemCardAction =
  | { type: 'SET_PRODUCTS'; payload: ItemCard[] }
  | { type: 'SET_PRODUCT'; payload: ItemCard | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_COLOR'; payload: string }
  | { type: 'SET_SELECTED_CAPACITY'; payload: string };

type ItemCardState = {
  products: ItemCard[];
  product: ItemCard | null;
  isLoading: boolean;
  selectedColor: string;
  selectedCapacity: string;
};

type ContextProps = {
  itemCardState: ItemCardState;
  itemCardDispatch: React.Dispatch<ItemCardAction>;
};

const initialState: ItemCardState = {
  products: [],
  product: null,
  isLoading: true,
  selectedColor: '',
  selectedCapacity: '',
};

const reducer = (
  state: ItemCardState,
  action: ItemCardAction,
): ItemCardState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
        selectedColor: action.payload ? action.payload.color : '',
        selectedCapacity: action.payload ? action.payload.capacity : '',
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SELECTED_COLOR':
      return { ...state, selectedColor: action.payload };
    case 'SET_SELECTED_CAPACITY':
      return { ...state, selectedCapacity: action.payload };
    default:
      return state;
  }
};

export const ItemCardContext = createContext<ContextProps>({
  itemCardState: initialState,
  itemCardDispatch: () => {},
});

interface ItemCardProviderProps {
  children: ReactNode;
}

export const ItemCardProvider: React.FC<ItemCardProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const category = location.pathname.split('/').filter(Boolean)[0];

  const [itemCardState, itemCardDispatch] = useReducer(reducer, initialState);

  const { data, isLoading } = useFetchData<ItemCard>(`${category}`);

  useEffect(() => {
    if (data) {
      itemCardDispatch({ type: 'SET_PRODUCTS', payload: data });
    }

    itemCardDispatch({ type: 'SET_LOADING', payload: isLoading });
  }, [data, isLoading]);

  return (
    <ItemCardContext.Provider value={{ itemCardState, itemCardDispatch }}>
      {children}
    </ItemCardContext.Provider>
  );
};
