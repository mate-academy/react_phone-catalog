export * from './NewModels';

import { getProducts } from '../../api/products';
import { ProductCardSkeleton } from '../../components/Loaders';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';

import styles from './NewModels.module.scss';
import { useRef, useState, useEffect } from 'react';

type NewModelsProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewModels = ({
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
    <section className={styles.newModels}>
      <div className={styles.newModels__title}>
        <h2>Brand new models </h2>
        <div className={styles.newModels__barContainer}>
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
      <div className={styles.newModels__cards} ref={cardsRef}>
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
              .toSorted((a, b) => b.year - a.year)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </>
        )}
      </div>
    </section>
  );
};
