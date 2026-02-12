import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';
import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';

interface ProductSliderProps {
  title: string;
  productsList: ProductType[];
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  productsList,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 288;

      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setIsLeftButtonDisabled(scrollLeft === 0);
      setIsRightButtonDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className={`${styles.newProducts} blocksIdentation`}>
      <div className={styles.newProducts__bar}>
        <h2 className={styles.newProducts__title}>{title}</h2>

        <div className={styles.newProducts__buttonsContainer}>
          <button
            // className={`${styles.newProducts__button} ${styles.newProducts__buttonLeft} ${styles.newProducts__buttonDisabled}`}
            className={classNames(
              styles.newProducts__button,
              styles.newProducts__buttonLeft,
              { [styles.newProducts__buttonDisabled]: isLeftButtonDisabled },
            )}
            onClick={() => scroll('left')}
            disabled={isLeftButtonDisabled}
          ></button>

          <button
            // className={`${styles.newProducts__button} ${styles.newProducts__buttonRight}`}
            className={classNames(
              styles.newProducts__button,
              styles.newProducts__buttonRight,
              { [styles.newProducts__buttonDisabled]: isRightButtonDisabled },
            )}
            onClick={() => scroll('right')}
          ></button>
        </div>
      </div>

      <div className={styles.newProducts__list} ref={scrollContainerRef}>
        {productsList.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};
