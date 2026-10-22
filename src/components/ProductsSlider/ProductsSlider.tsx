import { useEffect, useRef, useState } from 'react';

import { getProducts } from '../../api/products';
import { ProductCardSkeleton } from '../Loaders';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types';

import styles from './ProductsSlider.module.scss';

type ProductsSliderProps = {
  title: string;
  category?: string;
  sortBy?: 'discount' | 'random';
  excludeId?: string;
};

const prepareProducts = (
  list: Product[],
  category: string | undefined,
  excludeId: string | undefined,
  sortBy: 'discount' | 'random',
) => {
  const filtered = list.filter(
    product =>
      (!category ||
        product.category.toLowerCase() === category.toLowerCase()) &&
      product.itemId !== excludeId,
  );

  if (sortBy === 'discount') {
    return filtered.toSorted(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }

  return filtered.toSorted(() => Math.random() - 0.5);
};

export const ProductsSlider = ({
  title,
  category,
  sortBy = 'discount',
  excludeId,
}: ProductsSliderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getProducts()
      .then(list => {
        setProducts(prepareProducts(list, category, excludeId, sortBy));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [category, excludeId, sortBy]);

  return (
    <>
      {hasError ? (
        <p>Could not load products.</p>
      ) : (
        <section className={styles.hotPrices}>
          <div className={styles.hotPrices__title}>
            <h2>{title}</h2>

            <div className={styles.hotPrices__barContainer}>
              <a
                onClick={() => {
                  cardsRef.current?.scrollBy({
                    left: -300,
                    behavior: 'smooth',
                  });
                }}
              >
                <img alt="Previous" src="./icons/ChevronArrowLeft.svg" />
              </a>

              <a
                onClick={() => {
                  cardsRef.current?.scrollBy({
                    left: 300,
                    behavior: 'smooth',
                  });
                }}
              >
                <img alt="Next" src="./icons/ChevronArrowRight.svg" />
              </a>
            </div>
          </div>

          <div className={styles.hotPrices__cards} ref={cardsRef}>
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}

            {!isLoading &&
              products.map(product => (
                <ProductCard key={product.id} product={product} showFullPrice />
              ))}
          </div>
        </section>
      )}
    </>
  );
};
