/* eslint-disable @typescript-eslint/indent */
import { useEffect, useRef } from 'react';
import { Carousel } from '../Carousel';
import { ProductCatalog } from '../ProductCatalog/ProductCatalog';
import styles from './Home.module.scss';
import { arrowLeft, arrowRight } from '../../icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPhones } from '../features/phones';
import { Loader } from '../Loader';
import { Product } from '../../types/product';
import {
  nextHottestScroll,
  nextNewestScroll,
  prevHottestScroll,
  prevNewestScroll,
  setContainerWidth,
} from '../features/scroll';
import debounce from 'lodash.debounce';
import { Category } from '../Category';
import { fetchTablets } from '../features/tablets';
import { fetchAccessories } from '../features/accessories';
import { fetchProducts } from '../features/products';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { phones, loading, error } = useAppSelector(state => state.phones);
  const { hottestOffset, maxScroll, newestOffset } = useAppSelector(
    state => state.scroll,
  );
  const { products, loading: productsLoading } = useAppSelector(
    state => state.products,
  );
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    dispatch(fetchPhones());
    dispatch(fetchTablets());
    dispatch(fetchAccessories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const phonesWithYear =
    products && phones
      ? phones.map(phone => {
          const product = products.find(p => p.itemId === phone.id);

          return {
            ...phone,
            year: product ? product.year : 0,
          };
        })
      : [];

  const sortedPhones = phonesWithYear.sort((a, b) => b.year - a.year);

  const uniquePhones = sortedPhones.reduce((acc: Product[], phone) => {
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
        {(loading || productsLoading) && <Loader />}
        {error && <p>{error}</p>}
        {phones && (
          <ProductCatalog
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
          <ProductCatalog
            items={hottestPrice}
            offset={hottestOffset}
            discount={true}
          />
        )}
      </section>
    </>
  );
};
