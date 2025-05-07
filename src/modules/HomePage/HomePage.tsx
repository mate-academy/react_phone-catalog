import React, { useCallback, useEffect, useState } from 'react';
import { Categories } from './components/Categories/Categories';
import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel';
import { SectionSlider } from '../../components/SectionSlider';
import homePageStyles from './HomePage.module.scss';
import { useLoading } from '../../context/LoadingContext';
import { getAllProducts } from '../../services/products';
import { useError } from '../../context/ErrorContext';
import { handleError } from '../../utils/handleError';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading, stopLoading } = useLoading();
  const { setError } = useError();

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(setProducts)
      .catch(error => setError(handleError(error, 'Failed to load products')))
      .finally(() => stopLoading());
  }, [startLoading, stopLoading, setError]);

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
        <Carousel />
      </div>
      <SectionSlider
        products={products}
        title="Brand new models"
        sortFn={sortByYear}
      />
      <Categories />
      <SectionSlider
        products={products}
        title="HOT PRices"
        sortFn={sortByHotPrices}
      />
    </section>
  );
};
