/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useContext, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ios14mob_1 from '/img/banner-slider/mobile/iphone14pro-1.png';
import ios14mob_2 from '/img/banner-slider/mobile/iphone14pro-2.png';
import ios14mob_3 from '/img/banner-slider/mobile/iphone14pro-3.png';
import ios14_1 from '/img/banner-slider/iphone14pro-1.png';
import ios14_2 from '/img/banner-slider/iphone14pro-2.png';
import ios14_3 from '/img/banner-slider/iphone14pro-3.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLinks } from '../../../enums/NavLinks';
import { animateScroll } from 'react-scroll';
import { MainContext } from '../MainContext';
import { MainContextType } from '../types/MainContextType';
import { ProductsContext } from '../../ProductsContext';

interface Props {
  children: React.ReactNode;
}

export const MainContextProvider: React.FC<Props> = ({ children }) => {
  const { currentProduct, setComebackLocations } = useContext(ProductsContext);

  // #region responsive

  const isMobile = useMediaQuery({ query: '(max-width: 639.5px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 640px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });

  // #endregion
  // #region states

  const [imgIndex, setImgIndex] = useState(0);
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // #endregion
  // #region variables

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const mobImgs = [ios14mob_1, ios14mob_2, ios14mob_3];
  const imgs = [ios14_1, ios14_2, ios14_3];
  const isOnHomePage = pathname === '/' || pathname === `/${NavLinks.home}`;

  // #endregion
  // #region functions

  const repeatColor = (query: string, times: number) => {
    let str = '';

    for (let i = 0; i < times; i++) {
      str += query;
    }

    return str.slice(0, -1);
  };

  const scrollToTopHandler = (duration: number) => {
    animateScroll.scrollToTop({ duration, smooth: true });
  };

  const modelOnClickHandler = (
    name: string,
    category: string,
    itemId: string,
  ) => {
    if (currentProduct?.name === name) {
      return scrollToTopHandler(1000);
    }

    setComebackLocations(locations => [...locations, location]);
    setIsLoading(true);
    navigate(`/${category}/${itemId}`);
  };

  // #endregion
  // #region value

  const mainContextValue: MainContextType = useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
      isMenuShowed,
      mobImgs,
      imgs,
      imgIndex,
      isOnHomePage,
      isLoading,
      modelOnClickHandler,
      scrollToTopHandler,
      setIsMenuShowed,
      setImgIndex,
      repeatColor,
      setIsLoading,
    }),
    [
      imgIndex,
      isDesktop,
      isMenuShowed,
      isMobile,
      isOnHomePage,
      isTablet,
      isLoading,
    ],
  );

  // #endregion

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};
