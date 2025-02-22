/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '../modules/HomePage';
import { Phones } from '../modules/Categories/Phones';
import { Tablets } from '../modules/Categories/Tablets';
import { Accessories } from '../modules/Categories/Accessories';
import { NavLinks } from '../enums/NavLinks';
import { PageNotFound } from '../modules/PageNotFound';
import { Navigation } from './types/Navigation';
import { ProductsContext } from '../context/ProductsContext';
import { CurrentProduct } from '../context/ProductsContext/types/CurrentProduct';
import { ProductDetails } from '../modules/ProductDetails';
import { CardsContext } from '../context/CardsContext/CardsContext';

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
      ) as CurrentProduct;

      setCurrentProduct(product);
    }

    return () => {
      setCurrentProduct(null);

      if (ymalCardIndex !== 0) {
        setYmalCardIndex(0);
      }
    };
  }, [currentProduct, phones, tablets, accessories, pathname]);

  // #endregion

  const navigation: Navigation = {
    [NavLinks.home]: <HomePage />,
    [NavLinks.phones]: <Phones />,
    [NavLinks.tablets]: <Tablets />,
    [NavLinks.accessories]: <Accessories />,
  };

  return (
    <Routes location={location} key={pathname}>
      <Route path="/" element={<HomePage />} />
      {Object.values(navigation).map((value, index) => {
        const key = Object.keys(navigation)[index];

        return (
          <React.Fragment key={`${value}-${index}`}>
            <Route path={`/${key}`} key={key} element={value} />
            <Route
              path={`/${key}/:productId`}
              element={currentProduct && <ProductDetails />}
            />
          </React.Fragment>
        );
      })}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
});

AnimatedRoutes.displayName = 'AnimatedRoutes';
