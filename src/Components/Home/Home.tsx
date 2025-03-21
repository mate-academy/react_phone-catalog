/* eslint-disable @typescript-eslint/indent */
import { useEffect, useRef } from 'react';
import { Carousel } from '../Carousel';
import { ProductSlider } from '../ProductSlider';
import styles from './Home.module.scss';
import { arrowLeft, arrowRight } from '../../icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { Product, ProductWithYear } from '../../types/product';
import {
  nextHottestScroll,
  nextNewestScroll,
  prevHottestScroll,
  prevNewestScroll,
  setContainerWidth,
} from '../features/scroll';
import debounce from 'lodash.debounce';
import { Category } from '../Category';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { phones, loading, error } = useAppSelector(state => state.phones);
  const { hottestOffset, maxScroll, newestOffset } = useAppSelector(
    state => state.scroll,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        dispatch(setContainerWidth(width));
      }
    };

    updateWidth();
    const debouncedUpdate = debounce(updateWidth, 300);

    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, [dispatch]);

  const sortedPhones = phones
    ? [...phones].sort(
        (a: ProductWithYear, b: ProductWithYear) => b.year - a.year,
      )
    : [];

  const uniquePhones = sortedPhones.reduce((acc: Product[], phone: Product) => {
    const key = `${phone.namespaceId}_${phone.color.toLowerCase()}`;

    if (!acc.some(p => `${p.namespaceId}_${p.color.toLowerCase()}` === key)) {
      acc.push(phone);
    }

    return acc;
  }, []);

  const brandNewModels = uniquePhones.slice(0, 10);

  const getPriceDifference = (phone: Product): number => {
    return (phone.priceRegular ?? 0) - (phone.priceDiscount ?? 0);
  };

  const hottestPrice = phones
    ? [...phones]
        .sort((a, b) => getPriceDifference(b) - getPriceDifference(a))
        .slice(0, 10)
    : [];

  return (
    <>
      <section className={styles.marginContainer}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </section>
      <section className={styles.carousel}>
        <Carousel />
      </section>
      <section ref={containerRef} className={styles.marginContainer}>
        <div className={styles.newModelsContainer}>
          <h2 className={styles.category}>Brand new models</h2>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              onClick={() => dispatch(prevNewestScroll())}
              disabled={newestOffset === 0}
            >
              <img src={arrowLeft} alt="arrow-left" />
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(nextNewestScroll())}
              disabled={newestOffset === maxScroll}
            >
              <img src={arrowRight} alt="arrow-right" />
            </button>
          </div>
        </div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
        {phones && (
          <ProductSlider
            items={brandNewModels}
            offset={newestOffset}
            discount={false}
          />
        )}
      </section>
      <section className={styles.marginContainer}>
        <div className={styles.categoryContainer}>
          <h2 className={styles.category}>Shop by category</h2>
          <Category />
        </div>
      </section>
      <section ref={containerRef} className={styles.marginContainer}>
        <div className={styles.newModelsContainer}>
          <h2 className={styles.category}>Hot prices</h2>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.button}
              onClick={() => dispatch(prevHottestScroll())}
              disabled={hottestOffset === 0}
            >
              <img src={arrowLeft} alt="arrow-left" />
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(nextHottestScroll())}
              disabled={hottestOffset === maxScroll}
            >
              <img src={arrowRight} alt="arrow-right" />
            </button>
          </div>
        </div>
        {loading && <Loader />}
        {error && <p>{error}</p>}
        {phones && (
          <ProductSlider
            items={hottestPrice}
            offset={hottestOffset}
            discount={true}
          />
        )}
      </section>
    </>
  );
};
