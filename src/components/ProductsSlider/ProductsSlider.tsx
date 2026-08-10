import { useState, useEffect, useRef } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductsSkeleton } from '../ProductsSkeleton';
import { Product } from '../../types/Product';
import { getProducts, getSuggestedProducts } from '../../api/products';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  sortBy?: 'newest' | 'discount' | 'suggested';
  excludeProductId?: string;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  sortBy = 'newest',
  excludeProductId,
}) => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setProducts([]);

    const productsRequest =
      sortBy === 'suggested'
        ? getSuggestedProducts(excludeProductId)
        : getProducts();

    productsRequest
      .then(data => {
        const sortedProducts = [...data];

        if (sortBy === 'newest') {
          sortedProducts.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'discount') {
          sortedProducts.sort((a, b) => {
            const discountA = a.fullPrice - a.price;
            const discountB = b.fullPrice - b.price;

            return discountB - discountA;
          });
        }

        if (!isCancelled) {
          setProducts(sortedProducts);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [excludeProductId, sortBy]);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const cardElement = containerRef.current.firstElementChild as HTMLElement;

      const cardWidth = cardElement ? cardElement.offsetWidth : 237;
      const scrollAmount = cardWidth + 16;

      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScroll();
  }, [products]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2
          className={`${styles.title} ${
            sortBy === 'suggested' ? styles.suggestedTitle : ''
          }`}
        >
          {title}
        </h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label={t('slider.previous')}
          >
            <img
              src={getPublicPath('img/chevron-left.svg')}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label={t('slider.next')}
          >
            <img
              src={getPublicPath('img/chevron-right.svg')}
              alt=""
              aria-hidden="true"
              className={styles.icon}
            />
          </button>
        </div>
      </div>

      <div
        className={styles.cardsContainer}
        ref={containerRef}
        onScroll={checkScroll}
      >
        {isLoading ? (
          <ProductsSkeleton count={4} layout="slider" />
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              hideOldPrice={sortBy === 'newest'}
              smoothScrollToTop={sortBy === 'suggested'}
            />
          ))
        )}
      </div>
    </section>
  );
};
