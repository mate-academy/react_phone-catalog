/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { Models } from './components/Models';
import { Categories } from './components/Categories';
import { HOT_PRICES_TITLE, MODELS_TITLE } from './constants/ProductTitle';
import { ProductsContext } from '../../context/ProductsContext';
import { MainContext } from '../../context/MainContext';

export const HomePage: React.FC = () => {
  const { setIsEmptiness } = useContext(MainContext);
  const { products } = useContext(ProductsContext);
  const emptinessCondition = products.length === 0;

  useEffect(() => {
    if (emptinessCondition) {
      setIsEmptiness(true);
    } else {
      setIsEmptiness(false);
    }
  }, [emptinessCondition]);

  return (
    <main>
      <HeroSection />
      {!emptinessCondition && <Models title={MODELS_TITLE} />}
      <Categories />
      {!emptinessCondition && <Models title={HOT_PRICES_TITLE} />}
    </main>
  );
};
