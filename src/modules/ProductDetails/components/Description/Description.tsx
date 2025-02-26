/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line max-len
import { CurrentProduct } from '../../../../context/ProductsContext/types/CurrentProduct';
import { HeroSection } from './components/HeroSection';
import { MainContext } from '../../../../context/MainContext';
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
    <main>
      <h2 className={styles.title}>{name}</h2>
      <HeroSection />
      <div className={styles.wrapper}>
        <About />
        <TechSpecs />
      </div>
    </main>
  );
};
