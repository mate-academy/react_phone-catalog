/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Description } from './components/Description';
import { Models } from '../HomePage/components/Models';
import { YMAL_TITLE } from './constants/ModelsTitle';
import styles from './ProductDetails.module.scss';
import { MainContext } from '../../context/MainContext';
import { PageLoader } from '../PageLoader';

export const ProductDetails: React.FC = () => {
  const { isLoading, setIsLoading } = useContext(MainContext);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <section className={styles['product-details']}>
      {isLoading && <PageLoader />}
      <div className={styles.wrapper}>
        <Description />
      </div>
      <Models title={YMAL_TITLE} />
    </section>
  );
};
