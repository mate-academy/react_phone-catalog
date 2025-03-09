import React, { ReactNode, useEffect, useReducer, createContext } from 'react';
import { useFetchData } from '../utils/hooks/useFetchData';
import { Product } from '../types/Product';

export type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: ItemsPerPageOptions }
  | { type: 'SET_SORT_OPTION'; payload: SortOptions }
  | { type: 'SET_IS_SORT_DROPDOWN_OPEN'; payload: boolean }
  | { type: 'SET_IS_ITEM_DROPDOWN_OPEN'; payload: boolean };

export enum SortOptions {
  Newest = 'newest',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
}

export enum ItemsPerPageOptions {
  Sixteen = 16,
  TwentyFour = 24,
  ThirtyTwo = 32,
  Forty = 40,
  FortyEight = 48,
}

export enum SearchOptions {
  Sort = 'sort',
  Items = 'items',
  Page = 'page',
}

type State = {
  products: Product[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: ItemsPerPageOptions;
  sortOption: SortOptions;
  isSortDropdownOpen: boolean;
  isItemDropdownOpen: boolean;
};

type ProductsContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const initialState: State = {
  products: [],
  isLoading: true,
  currentPage: 1,
  itemsPerPage: ItemsPerPageOptions.Sixteen,
  sortOption: SortOptions.Newest,
  isSortDropdownOpen: false,
  isItemDropdownOpen: false,
};

const productsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1,
      };
    case 'SET_SORT_OPTION':
      return {
        ...state,
        sortOption: action.payload,
      };
    case 'SET_IS_SORT_DROPDOWN_OPEN':
      return {
        ...state,
        isSortDropdownOpen: action.payload,
      };
    case 'SET_IS_ITEM_DROPDOWN_OPEN':
      return {
        ...state,
        isItemDropdownOpen: action.payload,
      };
    default:
      return state;
  }
};

export const ProductsContext = createContext<ProductsContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const { data, isLoading } = useFetchData<Product>('products');

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    }

    dispatch({ type: 'SET_LOADING', payload: isLoading });
  }, [data, isLoading]);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
