import React, { useCallback, useEffect, useState } from 'react';
import { Categories } from './components/Categories/Categories';
import { Product } from '../../types/Product';
import { getData } from '../../utils/fetchClient';
import { Loader } from '../../components/Loader';
import { Carousel } from '../../components/Carousel';
import { SliderSection } from '../../components/SliderSection';
import homePageStyles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={homePageStyles.homePage}>
      <div className={homePageStyles.homePage__sectionWrapper}>
        <h1 className={homePageStyles.homePage__title}>
          Welcome to Nice Gadgets store!
        </h1>
        <Carousel />
      </div>
      <SliderSection
        products={products}
        title="Brand new models"
        sortFn={sortByYear}
      />
      <Categories products={products} />
      <SliderSection
        products={products}
        title="Brand new models"
        sortFn={sortByHotPrices}
      />
    </section>
  );
};
