/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { FavouritesContext } from '../../context/FavouritesContext';
import { MainContext } from '../../context/MainContext';
import { ProductsItems } from '../Categories/Products/components/ProductsItems';
import styles from './Favourites.module.scss';

export const Favourites: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const { setIsFooterAbsPos, scrollToTopHandler } = useContext(MainContext);
  const fValues = Object.values(favourites);

  const footerAbsPosCondition = fValues.length === 0;

  useEffect(() => {
    scrollToTopHandler(0);
  }, []);

  useEffect(() => {
    if (footerAbsPosCondition) {
      setIsFooterAbsPos(true);
    } else {
      setIsFooterAbsPos(false);
    }
  }, [footerAbsPosCondition]);

  return (
    <section className={styles.favourites}>
      <h2 className={styles.title}>Favourites</h2>
      <h3 className={styles.subtitle}>{fValues.length} models</h3>
      <ProductsItems products={fValues} />
    </section>
  );
};
