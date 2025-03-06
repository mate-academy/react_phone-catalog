/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { MainContext } from '../../context/MainContext';
import { ProductsContext } from '../../context/ProductsContext';
import { Models } from '../HomePage/components/Models';
import { PageLoader } from '../PageLoader';
import { Back } from './components/Back';
import { Description } from './components/Description';
import { ProductNotFound } from './components/ProductNotFound';
import { YMAL_TITLE } from './constants/ModelsTitle';
import pdStyles from './ProductDetails.module.scss';

export const ProductDetails: React.FC = () => {
  const { currentProduct } = useContext(ProductsContext);
  const { isLoading, setIsLoading } = useContext(MainContext);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <section className={pdStyles['product-details']}>
      {isLoading && <PageLoader />}
      <div className={pdStyles.wrapper}>
        <Back />
        {currentProduct ? <Description /> : <ProductNotFound />}
      </div>
      {currentProduct && <Models title={YMAL_TITLE} />}
    </section>
  );
};
