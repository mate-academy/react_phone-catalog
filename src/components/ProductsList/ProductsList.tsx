import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import { ButtonScroll } from '../ButtonScroll';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsList: React.FC<Props> = ({ products, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const scrollAmount = 272 + 16;

  const scrollContainerLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollContainerRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setIsLeftDisabled(scrollLeft <= 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    requestAnimationFrame(update);

    container.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [products]);

  return (
    <>
      <div className={styles['header-row']}>
        <h2>{title}</h2>
        <div className={styles.arrow}>
          <ButtonScroll
            buttonText="img/icons/arrow-left.svg"
            clickFunc={scrollContainerLeft}
            disabled={isLeftDisabled}
          />
          <ButtonScroll
            buttonText="img/icons/arrow-right.svg"
            clickFunc={scrollContainerRight}
            disabled={isRightDisabled}
          />
        </div>
      </div>
      <div className={styles['products-list']} ref={containerRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
