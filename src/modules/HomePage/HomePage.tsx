import React, { useCallback, useEffect, useState } from 'react';
import { Categories } from './components/Categories/Categories';
import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel';
import { SectionSlider } from '../../components/SectionSlider';
import homePageStyles from './HomePage.module.scss';
import { useLoading } from '../../context/LoadingContext';
import { getAllProducts } from '../../services/products';
import { useError } from '../../context/ErrorContext';
import { handleErrorMessage } from '../../utils/handleErrorMessage';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading, stopLoading } = useLoading();
  const { addError } = useError();
  const [isHasError, setIsHasError] = useState(false);

  const loadProducts = useCallback(() => {
    startLoading();
    setIsHasError(false);
    getAllProducts()
      .then(setProducts)
      .catch(err => {
        addError(handleErrorMessage(err, 'Failed to load products.'));
        setIsHasError(true);
      })
      .finally(() => stopLoading());
  }, [startLoading, stopLoading, addError]);

  useEffect(() => loadProducts(), [loadProducts]);

  const sortByHotPrices = useCallback(
    (product1: Product, product2: Product) => {
      const discountProduct1 = product1.fullPrice - product1.price;
      const discountProduct2 = product2.fullPrice - product2.price;

      return discountProduct2 - discountProduct1;
    },
    [],
  );

  const sortByYear = useCallback(
    (product1: Product, product2: Product) => product2.year - product1.year,
    [],
  );

  return (
    <section className={homePageStyles.homePage}>
      <div className={homePageStyles.homePage__sectionWrapper}>
        <h1 className={homePageStyles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <Carousel className={homePageStyles.homePage__carousel} />
      </div>
      {isHasError ? (
        <ErrorFallback onRetry={loadProducts} />
      ) : (
        <>
          <SectionSlider
            products={products}
            title="Brand new models"
            sortFn={sortByYear}
          />
          <Categories />
          <SectionSlider
            products={products}
            title="Hot prices"
            sortFn={sortByHotPrices}
          />
        </>
      )}
    </section>
  );
};
