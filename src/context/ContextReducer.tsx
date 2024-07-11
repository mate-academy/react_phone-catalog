/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { getAccessories, getProducts, getTablets } from '../utils/functionGet';
import useLocalStorageReducer from '../customHook/useLocalStorageState';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablets';
import { Accessorie } from '../types/accessories';
// eslint-disable-next-line max-len
import { EnumSizeScreen } from '../componentsApp/SlideListDevices/BrandList/EnumSizeScreen';
import { Product } from '../types/product';

export type Action =
  | { type: 'swipeImg'; numberImg: number }
  | { type: 'nextSlide' }
  | { type: 'prevSlide' }
  | { type: 'nextSlideHot' }
  | { type: 'prevSlideHot' }
  | { type: 'nextSlideLike' }
  | { type: 'prevSlideLike' }
  | { type: 'setPhones'; payload: Phone[] }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'nextSlidePhone' }
  | { type: 'prevSlidePhone' }
  | { type: 'setSizeScreen'; payload: EnumSizeScreen }
  | { type: 'addFavorites'; payload: Phone | Tablet | Accessorie }
  | { type: 'addCart'; payload: Phone | Tablet | Accessorie }
  | { type: 'setTablets'; payload: Tablet[] }
  | { type: 'setAccessories'; payload: Accessorie[] }
  | { type: 'setItem'; payload: Phone | Tablet | Accessorie }
  | { type: 'setMainItemPhoto'; payload: string }
  | { type: 'resetAlsoLikeSLide' }
  | { type: 'setSortByDropdown'; delete?: string }
  | { type: 'setPerPageDropdown'; delete?: string }
  | { type: 'setPaginPage'; payload: number[] }
  | { type: 'deleteCartItem'; payload: string }
  | { type: 'setCheckout' }
  | { type: 'resetCartItems' }
  | { type: 'switchThem' }
  | { type: 'switchSlideInfinity'; payload: boolean }
  | { type: 'addItemCart'; payload: Phone | Tablet | Accessorie }
  | { type: 'removeProductById'; payload: string };

export interface State {
  sliderImg: number;
  slideInfinity: boolean;
  phones: Phone[];
  slidePhoneMargin: number;
  slideHotPricesMargin: number;
  slideAlsoLikeMargin: number;
  sizeScreenMargin: number;
  favoritesDevice: (Phone | Tablet | Accessorie)[];
  cartPhone: (Phone | Tablet | Accessorie)[];

  Tablets: Tablet[];
  Accessories: Accessorie[];
  itemDevice: Phone | Tablet | Accessorie | null;
  mainItemPhoto: string;
  sortByDropdown: boolean;
  perPageDropdown: boolean;
  paginPages: number[];
  product: Product[];
  checkoutWindow: boolean;

  darkThem: boolean;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'swipeImg':
      return {
        ...state,
        sliderImg: action.numberImg,
      };

    case 'nextSlide':
      if (state.sliderImg === 3) {
        return {
          ...state,
          sliderImg: 1,
        };
      }

      return {
        ...state,
        sliderImg: state.sliderImg + 1,
      };

    case 'deleteCartItem':
      return {
        ...state,
        cartPhone: state.cartPhone.filter(d => d.id !== action.payload),
      };

    case 'nextSlidePhone':
      return {
        ...state,
        slidePhoneMargin: state.slidePhoneMargin + 1,
      };

    case 'setPaginPage':
      return {
        ...state,
        paginPages: action.payload,
      };

    case 'prevSlidePhone':
      return {
        ...state,
        slidePhoneMargin: state.slidePhoneMargin - 1,
      };

    case 'prevSlide':
      if (state.sliderImg === 1) {
        return {
          ...state,
          sliderImg: 3,
        };
      }

      return {
        ...state,
        sliderImg: state.sliderImg - 1,
      };

    case 'nextSlideHot':
      return {
        ...state,
        slideHotPricesMargin: state.slideHotPricesMargin + 1,
      };

    case 'prevSlideHot':
      return {
        ...state,
        slideHotPricesMargin: state.slideHotPricesMargin - 1,
      };

    case 'nextSlideLike':
      return {
        ...state,
        slideAlsoLikeMargin: state.slideAlsoLikeMargin + 1,
      };

    case 'prevSlideLike':
      return {
        ...state,
        slideAlsoLikeMargin: state.slideAlsoLikeMargin - 1,
      };

    case 'setPhones':
      return {
        ...state,
        phones: action.payload,
      };

    case 'setSizeScreen':
      return {
        ...state,
        slidePhoneMargin: 0,
        sizeScreenMargin: action.payload,
      };

    case 'resetCartItems':
      return {
        ...state,
        cartPhone: [],
      };

    case 'addFavorites':
      if (
        state.favoritesDevice &&
        state.favoritesDevice.every(p => p.id !== action.payload.id)
      ) {
        return {
          ...state,
          favoritesDevice: [...state.favoritesDevice, action.payload],
        };
      }

      return {
        ...state,
        favoritesDevice: (state.favoritesDevice ?? []).filter(
          phone => phone.id !== action.payload.id,
        ),
      };

    case 'addCart':
      if ((state.cartPhone ?? []).every(p => p.id !== action.payload.id)) {
        return {
          ...state,
          cartPhone: [...state.cartPhone, action.payload],
        };
      }

      return {
        ...state,
        cartPhone: (state.cartPhone ?? []).filter(
          phone => phone.id !== action.payload.id,
        ),
      };

    case 'setTablets':
      return {
        ...state,
        Tablets: action.payload,
      };

    case 'setAccessories':
      return {
        ...state,
        Accessories: action.payload,
      };

    case 'setItem':
      return {
        ...state,
        itemDevice: action.payload,
      };

    case 'resetAlsoLikeSLide':
      return {
        ...state,
        slideAlsoLikeMargin: 0,
      };

    case 'setMainItemPhoto':
      return {
        ...state,
        mainItemPhoto: action.payload,
      };

    case 'setSortByDropdown':
      if (action.delete) {
        return {
          ...state,
          sortByDropdown: false,
        };
      }

      return {
        ...state,
        sortByDropdown: state.sortByDropdown ? false : true,
      };

    case 'setPerPageDropdown':
      if (action.delete) {
        return {
          ...state,
          perPageDropdown: false,
        };
      }

      return {
        ...state,
        perPageDropdown: state.perPageDropdown ? false : true,
      };

    case 'setProducts':
      return {
        ...state,
        product: action.payload,
      };

    case 'setCheckout':
      return {
        ...state,
        checkoutWindow: state.checkoutWindow ? false : true,
      };

    case 'switchThem':
      return {
        ...state,
        darkThem: state.darkThem ? false : true,
      };

    case 'switchSlideInfinity':
      return {
        ...state,
        slideInfinity: action.payload,
      };

    case 'addItemCart':
      return {
        ...state,
        cartPhone: [...state.cartPhone, action.payload],
      };

    case 'removeProductById':
      const index = state.cartPhone.findIndex(
        product => product.id === action.payload,
      );

      const newCart = state.cartPhone
        .slice(0, index)
        .concat(state.cartPhone.slice(index + 1));

      return {
        ...state,
        cartPhone: newCart,
      };
  }
};

const initialState: State = {
  sliderImg: 1,
  slideInfinity: true,
  phones: [],
  slidePhoneMargin: 0,
  slideHotPricesMargin: 0,
  slideAlsoLikeMargin: 0,
  sizeScreenMargin: 0,
  favoritesDevice: [],
  cartPhone: [],

  Tablets: [],
  Accessories: [],
  itemDevice: null,
  mainItemPhoto: '',
  sortByDropdown: false,
  perPageDropdown: false,
  paginPages: [],
  product: [],
  checkoutWindow: false,

  darkThem: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorageReducer(
    'appState',
    reducer,
    initialState,
  );

  useEffect(() => {
    getTablets().then(tablets => {
      dispatch({ type: 'setTablets', payload: tablets });
    });

    getAccessories().then(a => {
      dispatch({ type: 'setAccessories', payload: a });
    });

    getProducts().then(p => {
      dispatch({ type: 'setProducts', payload: p });
    });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
