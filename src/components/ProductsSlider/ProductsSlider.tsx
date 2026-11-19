import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { getPublicUrl } from '../../utils/getPublicUrl';

type Props = {
  title: string;
  products: Product[];
};

const getVisibleCount = () => {
  const width = document.documentElement.clientWidth;

  if (width < 640) {
    return 1;
  }

  if (width < 896) {
    return 2;
  }

  if (width < 1200) {
    return 3;
  }

  return 4;
};

export const ProductsSlider = ({ title, products }: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxStartIndex = Math.max(0, products.length - visibleCount);

  useEffect(() => {
    setStartIndex(current => Math.min(current, maxStartIndex));
  }, [maxStartIndex]);

  const visibleProducts = products.slice(
    startIndex,
    startIndex + visibleCount + 1,
  );
  const isFirst = startIndex === 0;
  const isLast = startIndex >= maxStartIndex;

  const handlePrevious = () => {
    setStartIndex(current => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setStartIndex(current => Math.min(maxStartIndex, current + 1));
  };

  return (
    <section className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            className={styles.sliderButton}
            type="button"
            aria-label="Previous products"
            onClick={handlePrevious}
            disabled={isFirst}
          >
            <img
              className={styles.chevron}
              src={getPublicUrl(
                theme === 'dark'
                  ? '/img/icon/chevron-left-dark.svg'
                  : '/img/icon/chevron-left.svg',
              )}
              alt=""
            />
          </button>

          <button
            className={styles.sliderButton}
            type="button"
            aria-label="Next products"
            onClick={handleNext}
            disabled={isLast}
          >
            <img
              className={styles.chevron}
              src={getPublicUrl(
                theme === 'dark'
                  ? '/img/icon/chevron-right-dark.svg'
                  : '/img/icon/chevron-right.svg',
              )}
              alt=""
            />
          </button>
        </div>
      </div>

      <div className={styles.productsViewport}>
        <div className={styles.products}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
