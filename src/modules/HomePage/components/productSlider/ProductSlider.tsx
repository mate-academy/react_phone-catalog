import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../../shared/types';
import { ProductsList } from '../../../CategoryPage/components/ProductsList';
import styles from './ProductSlider.module.scss';

export const ProductSlider: React.FC<{ products: Product[] }> = ({
  products = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTrsnsitioning] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const computeSlidesPerView = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        return 4;
      }

      if (width >= 700) {
        return 3;
      }

      return 1;
    };

    const update = () => setSlidesPerView(computeSlidesPerView());

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(() => {
    if (!products.length) {
      return [] as Product[][];
    }

    const chunkSize = Math.max(1, slidesPerView);
    const chunks: Product[][] = [];

    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }

    return chunks;
  }, [products, slidesPerView]);

  useEffect(() => {
    // keep currentIndex in range when pages count changes
    if (currentIndex > pages.length - 1) {
      setCurrentIndex(0);
    }
  }, [pages.length, currentIndex]);

  // useEffect(() => {
  //   if (products.length === 0) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setIsTrsnsitioning(true);
  //     setTimeout(() => {
  //       setCurrentIndex(prevIndex => (prevIndex + 1) % 2);
  //       setIsTrsnsitioning(false);
  //     }, 500);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [products.length]);

  const goToPrev = () => {
    if (products.length === 0 || pages.length === 0) {
      return;
    }

    setIsTrsnsitioning(true);

    const totalPages = pages.length;

    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
      setIsTrsnsitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (products.length === 0 || pages.length === 0) {
      return;
    }

    setIsTrsnsitioning(true);

    const totalPages = pages.length;

    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
      setIsTrsnsitioning(false);
    }, 500);
  };

  if (!products || products.length === 0) {
    return <div className={styles.slider}>No product available</div>;
  }

  return (
    <div className={styles.slider}>
      <button className={styles.prev} onClick={goToPrev}>
        &lt;
      </button>

      <div className={styles.slide}>
        <div
          className={`${styles.slideTrack} ${isTransitioning ? styles.transition : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {pages.map((group, idx) => (
            <div className={styles.page} key={idx}>
              <ProductsList products={group} isSlider={true} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.next} onClick={goToNext}>
        &gt;
      </button>

      <div className={styles.dots}>
        {Array.from({ length: pages.length }, (_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => {
              setIsTrsnsitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTrsnsitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
};
