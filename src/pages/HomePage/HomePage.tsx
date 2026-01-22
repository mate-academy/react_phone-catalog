/* src/pages/HomePage/HomePage.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Categories } from '../../components/Categories/Categories';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';
import cn from 'classnames';

// 👇 ZMIANA: Pusty alt="", bo opis jest na przycisku (Button)
const ArrowLeft = () => (
  <img src="/img/icons/arrow-left.svg" alt="" className={styles.icon} />
);

const ArrowRight = () => (
  <img src="/img/icons/arrow-right.svg" alt="" className={styles.icon} />
);

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const brandNewRef = useRef<HTMLDivElement>(null);
  const hotPriceRef = useRef<HTMLDivElement>(null);

  const [canScrollBrand, setCanScrollBrand] = useState([false, true]);
  const [canScrollHot, setCanScrollHot] = useState([false, true]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);

  const hotPriceProducts = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  const checkScroll = (
    element: HTMLDivElement,
    setScrollState: React.Dispatch<React.SetStateAction<boolean[]>>,
  ) => {
    const { scrollLeft, scrollWidth, clientWidth } = element;

    const canScrollLeft = Math.ceil(scrollLeft) > 0;
    const canScrollRight =
      Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5;

    setScrollState([canScrollLeft, canScrollRight]);
  };

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    setScrollState: React.Dispatch<React.SetStateAction<boolean[]>>,
  ) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -288 : 288;

      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => checkScroll(ref.current!, setScrollState), 500);
    }
  };

  useEffect(() => {
    const setupScrollListener = (
      ref: React.RefObject<HTMLDivElement>,
      setScrollState: React.Dispatch<React.SetStateAction<boolean[]>>,
    ) => {
      const el = ref.current;

      if (el) {
        const handle = () => checkScroll(el, setScrollState);

        el.addEventListener('scroll', handle);
        window.addEventListener('resize', handle);
        checkScroll(el, setScrollState);

        return () => {
          el.removeEventListener('scroll', handle);
          window.removeEventListener('resize', handle);
        };
      }

      return () => {};
    };

    const cleanupBrand = setupScrollListener(brandNewRef, setCanScrollBrand);
    const cleanupHot = setupScrollListener(hotPriceRef, setCanScrollHot);

    return () => {
      cleanupBrand();
      cleanupHot();
    };
  }, [products]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.sliderWrapper}>
        <PicturesSlider />
      </div>

      {/* === SECTION 1: Brand New Models === */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>

          <div className={styles.navigation}>
            <button
              type="button"
              className={cn(styles.arrow, {
                [styles.disabled]: !canScrollBrand[0],
              })}
              onClick={() =>
                handleScroll(brandNewRef, 'left', setCanScrollBrand)
              }
              disabled={!canScrollBrand[0]}
              // 👇 ZMIANA: Dodano title (dla błędu lintera) i aria-label (dla czytników)
              aria-label="Previous products"
              title="Previous products"
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              className={cn(styles.arrow, {
                [styles.disabled]: !canScrollBrand[1],
              })}
              onClick={() =>
                handleScroll(brandNewRef, 'right', setCanScrollBrand)
              }
              disabled={!canScrollBrand[1]}
              // 👇 ZMIANA: Dodano title i aria-label
              aria-label="Next products"
              title="Next products"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <ProductsList
          products={brandNewProducts}
          ref={brandNewRef}
          variant="slider"
        />
      </section>

      {/* === SECTION 2: Categories === */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '24px' }}>
          Shop by category
        </h2>
        <Categories />
      </section>

      {/* === SECTION 3: Hot Prices === */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>

          <div className={styles.navigation}>
            <button
              type="button"
              className={cn(styles.arrow, {
                [styles.disabled]: !canScrollHot[0],
              })}
              onClick={() => handleScroll(hotPriceRef, 'left', setCanScrollHot)}
              disabled={!canScrollHot[0]}
              // 👇 ZMIANA: Dodano title i aria-label
              aria-label="Previous products"
              title="Previous products"
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              className={cn(styles.arrow, {
                [styles.disabled]: !canScrollHot[1],
              })}
              onClick={() =>
                handleScroll(hotPriceRef, 'right', setCanScrollHot)
              }
              disabled={!canScrollHot[1]}
              // 👇 ZMIANA: Dodano title i aria-label
              aria-label="Next products"
              title="Next products"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <ProductsList
          products={hotPriceProducts}
          ref={hotPriceRef}
          variant="slider"
        />
      </section>
    </div>
  );
};
