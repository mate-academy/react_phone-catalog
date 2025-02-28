/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import styles from './Favourites.module.scss';
import { ProductsItems } from '../Categories/Products/components/ProductsItems';
import { FavouritesContext } from '../../context/FavouritesContext';
import { MainContext } from '../../context/MainContext';

export const Favourites: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const { setIsEmptiness } = useContext(MainContext);

  const emptinessCondition = Object.values(favourites).length === 0;

  useEffect(() => {
    if (emptinessCondition) {
      setIsEmptiness(true);
    } else {
      setIsEmptiness(false);
    }
  }, [emptinessCondition]);

  return (
    <section className={styles.favourites}>
      <h2 className={styles.title}>Favourites</h2>
      <ProductsItems products={Object.values(favourites)} />
    </section>
  );
};
