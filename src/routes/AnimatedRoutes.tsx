/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { CardsContext } from '../context/CardsContext/CardsContext';
import { MainContext } from '../context/MainContext';
import { ProductsContext } from '../context/ProductsContext';
import { ErrorQueries } from '../enums/ErrorsQueries';
import { MainNavLinks } from '../enums/MainNavLinks';
import { NavLinks } from '../enums/NavLinks';
import { Cart } from '../modules/Cart';
import { Accessories } from '../modules/Categories/Accessories';
import { Phones } from '../modules/Categories/Phones';
import { Tablets } from '../modules/Categories/Tablets';
import { Error } from '../modules/Error';
import { Favourites } from '../modules/Favourites';
import { HomePage } from '../modules/HomePage';
import { ProductDetails } from '../modules/ProductDetails';
import { Navigation } from './types/Navigation';

export const AnimatedRoutes: React.FC = React.memo(() => {
  // #region context

  const {
    currentProduct,
    phones,
    tablets,
    accessories,
    categories,
    setCurrentProduct,
  } = useContext(ProductsContext);
  const { setIsFooterAbsPos, isFooterAbsPos, setCurrentProductProps } =
    useContext(MainContext);
  const { ymalCardIndex, setYmalCardIndex } = useContext(CardsContext);

  // #endregion

  const location = useLocation();
  const { pathname } = location;

  // #region useEffects

  useEffect(() => {
    const pathArr = pathname.split('/');

    if (pathArr.length > 2) {
      const itemId = pathArr[pathArr.length - 1];
      const category = pathArr[1];

      const product = categories[category].find(
        _product => _product.id === itemId,
      );

      if (product) {
        setCurrentProduct(product);
      } else {
        setIsFooterAbsPos(true);
      }

      return () => {
        setCurrentProduct(null);
        setCurrentProductProps(null);

        if (isFooterAbsPos) {
          setIsFooterAbsPos(false);
        }

        if (ymalCardIndex !== 0) {
          setYmalCardIndex(0);
        }
      };
    }

    return () => {};
  }, [currentProduct, phones, tablets, accessories, pathname]);

  // #endregion

  const navigation: Navigation = {
    [MainNavLinks.home]: <HomePage />,
    [MainNavLinks.phones]: <Phones />,
    [MainNavLinks.tablets]: <Tablets />,
    [MainNavLinks.accessories]: <Accessories />,
  };

  return (
    <Routes location={location} key={pathname}>
      <Route path="/" element={<HomePage />} />
      {Object.values(navigation).map((value, index) => {
        const key = Object.keys(navigation)[index];

        return (
          <React.Fragment key={`${value}-${index}`}>
            <Route path={`/${key}`} key={key} element={value} />
            <Route path={`/${key}/:productId`} element={<ProductDetails />} />
          </React.Fragment>
        );
      })}
      <Route path={`/${NavLinks.favourites}`} element={<Favourites />} />
      <Route path={`/${NavLinks.cart}`} element={<Cart />} />
      <Route path="/*" element={<Error query={ErrorQueries.pageNotFound} />} />
    </Routes>
  );
});

AnimatedRoutes.displayName = 'AnimatedRoutes';
