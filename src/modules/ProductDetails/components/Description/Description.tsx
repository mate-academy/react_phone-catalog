/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line max-len
import { CurrentProduct } from '../../../../context/ProductsContext/types/CurrentProduct';
import { HeroSection } from './components/HeroSection';
import { MainContext } from '../../../../context/MainContext';
import { Back } from './components/Back';
import { ProductsContext } from '../../../../context/ProductsContext';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import styles from './Description.module.scss';

export const Description: React.FC = () => {
  const { scrollToTopHandler } = useContext(MainContext);
  const { currentProduct } = useContext(ProductsContext);
  const { name } = currentProduct as CurrentProduct;

  useEffect(() => scrollToTopHandler(0), []);

  return (
    <div>
      <Back />
      <main>
        <h1 className={styles.title}>{name}</h1>
        <HeroSection />
        <div className={styles.wrapper}>
          <About />
          <TechSpecs />
        </div>
      </main>
    </div>
  );
};
