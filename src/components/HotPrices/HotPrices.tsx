export * from './HotPrices';

import { getProducts } from '../../api/products';
import { ProductCardSkeleton } from '../../components/Loaders';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';

import styles from './HotPrices.module.scss';
import { useRef, useState, useEffect } from 'react';

type NewModelsProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HotPrices = ({
  isLoading,
  setIsLoading,
  setHasError,
}: NewModelsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getProducts()
      .then(product => {
        setProducts(product);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <section className={styles.hotPrices}>
      <div className={styles.hotPrices__title}>
        <h1>Hot Prices </h1>
        <div className={styles.hotPrices__barContainer}>
          <a
            onClick={() => {
              cardsRef.current?.scrollBy({
                left: -300,
                behavior: 'smooth',
              });
            }}
          >
            <img alt="Previus" src="./icons/ChevronArrowLeft.svg" />
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
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </>
        )}

        {!isLoading && (
          <>
            {products
              .toSorted((a, b) => {
                const discountA = a.fullPrice - a.price;
                const discountB = b.fullPrice - b.price;

                return discountB - discountA;
              })
              .map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showFullPrice={true}
                />
              ))}
          </>
        )}
      </div>
    </section>
  );
};
