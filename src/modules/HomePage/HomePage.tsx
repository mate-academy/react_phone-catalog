import styles from './HomePage.module.scss';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getNewestProducts } from '../../utils/getNewestProducts';
import { getMaxDiscountProducts } from '../../utils/getMaxDiscountProducts';
import { sortProductsById } from './utils/sortProductsById';
import { getUniqueColorProducts } from './utils/getUniqueColorProducts';
import { useEffect } from 'react';
import { init } from '../../store/products/productsSlice';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const HomePage = () => {
  const { products } = useAppSelector(state => state.products);
  const newestProducts = sortProductsById(getNewestProducts(products));
  const hotestProducts = sortProductsById(getMaxDiscountProducts(products));
  const uniqueNewestProducts = getUniqueColorProducts(newestProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useScrollToTop();

  return (
    <main className={styles['home-page']}>
      <Hero />

      <ProductsSlider
        products={uniqueNewestProducts}
        heading="Brand new models"
        showPrice={false}
        slidesToScroll={4}
      />

      <Categories />

      <ProductsSlider
        products={hotestProducts}
        heading="Hot prices"
        slidesToScroll={1}
      />
    </main>
  );
};
