import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './HotPrices.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

const getVisibleCount = () => {
  const width = document.documentElement.clientWidth;

  if (width < 640) {
    return 1;
  }

  if (width < 896) {
    return 2;
  }

  if (width < 1184) {
    return 3;
  }

  return 4;
};

const PRODUCTS_PER_PAGE = 4;

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(getPublicUrl('/api/products.json'))
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      });
  }, []);

  const hotProducts = [...products].sort(
    (productA, productB) =>
      productB.fullPrice -
      productB.price -
      (productA.fullPrice - productA.price),
  );

  const maxStartIndex = Math.max(hotProducts.length - visibleCount, 0);

  useEffect(() => {
    setStartIndex(current => Math.min(current, maxStartIndex));
  }, [maxStartIndex]);

  const handlePrevious = () => {
    setStartIndex(current => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    setStartIndex(current => Math.min(current + 1, maxStartIndex));
  };

  const isPreviousDisabled = startIndex === 0;
  const isNextDisabled = startIndex >= maxStartIndex;

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h2 className={styles.title}>Hot prices</h2>

        <div className={styles.buttons}>
          <button
            className={styles.sliderButton}
            type="button"
            aria-label="Previous products"
            onClick={handlePrevious}
            disabled={isPreviousDisabled}
          >
            <img
              className={cn(styles.chevron, styles.chevronLeft)}
              src={getPublicUrl(
                isPreviousDisabled
                  ? '/img/icon/product-chevron-disabled.svg'
                  : '/img/icon/product-chevron.svg',
              )}
              alt=""
            />
          </button>

          <button
            className={styles.sliderButton}
            type="button"
            aria-label="Next products"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            <img
              className={styles.chevron}
              src={getPublicUrl(
                isNextDisabled
                  ? '/img/icon/product-chevron-disabled.svg'
                  : '/img/icon/product-chevron.svg',
              )}
              alt=""
            />
          </button>
        </div>
      </div>

      <div className={styles.productsViewport}>
        <div className={styles.products}>
          {hotProducts
            .slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
            .map(product => (
              <ProductCard key={product.id} product={product} showFullPrice />
            ))}
        </div>
      </div>
    </section>
  );
};
