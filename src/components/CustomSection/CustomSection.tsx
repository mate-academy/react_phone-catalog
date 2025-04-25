import styles from './CustomSection.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';
import { ProductCard } from 'components/ProductCard';
import { Product } from 'types/Product';
import { useMemo, useRef, useState } from 'react';

type CustomSectionProps = {
  title: string;
  products: Product[];
};

export const CustomSection = ({ title, products }: CustomSectionProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    const maxIndex = products.length - visibleCount;

    setStartIndex(prev => Math.min(prev + visibleCount, maxIndex));
  };

  const initialProductsRef = useRef(products);

  const visibleProducts = useMemo(() => {
    return initialProductsRef.current.slice(
      startIndex,
      startIndex + visibleCount,
    );
  }, [startIndex]);

  return (
    <section className={styles.container}>
      <div className={styles.container__header}>
        <span className={styles.container__header__title}>{title}</span>
        <div className={styles.container__header__buttons}>
          <IconButton
            icon={
              <FiChevronLeft
                size={24}
                color={startIndex > 0 ? '#313237' : '#E2E6E9'}
              />
            }
            isActive={startIndex > 0}
            useBorder={true}
            height={'32px'}
            width={'32px'}
            onClick={handlePrev}
          />
          <IconButton
            icon={
              <FiChevronRight
                size={24}
                color={
                  startIndex < products.length - visibleCount
                    ? '#313237'
                    : '#E2E6E9'
                }
              />
            }
            isActive={startIndex < products.length - visibleCount}
            useBorder={true}
            height={'32px'}
            width={'32px'}
            onClick={handleNext}
          />
        </div>
      </div>

      <div className={styles.container__listWrapper}>
        <div className={styles.container__list}>
          {visibleProducts.map(product => (
            <div key={product.id} className={styles.container__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
