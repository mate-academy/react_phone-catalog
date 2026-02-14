/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { MainContext } from '../../context/MainContext';
import { ProductsContext } from '../../context/ProductsContext';
import { Categories } from './components/Categories';
import { HeroSection } from './components/HeroSection';
import { Models } from './components/Models';
import { HOT_PRICES_TITLE, MODELS_TITLE } from './constants/ProductTitle';

export const HomePage: React.FC = () => {
  const { setIsFooterAbsPos } = useContext(MainContext);
  const { products } = useContext(ProductsContext);
  const footerAbsPosCondition = products.length === 0;

  useEffect(() => {
    if (footerAbsPosCondition) {
      setIsFooterAbsPos(true);
    } else {
      setIsFooterAbsPos(false);
    }
  }, [footerAbsPosCondition]);

  return (
    <main>
      <HeroSection />
      {!footerAbsPosCondition && <Models title={MODELS_TITLE} />}
      <Categories />
      {!footerAbsPosCondition && <Models title={HOT_PRICES_TITLE} />}
    </main>
  );
};
