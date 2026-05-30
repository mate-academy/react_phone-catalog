/* eslint-disable max-len */
import { createContext } from 'react';

import { MainContextType } from './types/MainContextType';

export const MainContext = createContext<MainContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isMenuShowed: false,
  mobImgs: [],
  imgs: [],
  imgIndex: 0,
  isOnHomePage: false,
  isLoading: false,
  isError: '',
  isFooterAbsPos: false,
  currentProductProps: null,
  MWFValueCondition: false,
  modelOnClickHandler: () => {},
  scrollToTopHandler: () => {},
  setIsMenuShowed: () => {},
  setImgIndex: () => {},
  repeatColor: () => {},
  setIsLoading: () => {},
  setIsError: () => {},
  setIsFooterAbsPos: () => {},
  setCurrentProductProps: () => {},
});
