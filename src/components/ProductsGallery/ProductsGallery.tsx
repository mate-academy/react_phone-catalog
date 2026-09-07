import styles from './ProductsGallery.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  className?: string;
  title?: string;
};

export const ProductsGallery: React.FC<Props> = ({
  products,
  className,
  title,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const elementsAmount = products.length;
  const [currentPosition, setCurrentPosition] = useState(1);
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);
  const scrollByPixels =
    screenWidth < 640 ? 228 : screenWidth < 1200 ? 253 * 2 : 288 * 4;

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -scrollByPixels,
      behavior: 'smooth',
    });

    if (currentPosition !== 1) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: scrollByPixels,
      behavior: 'smooth',
    });

    if (currentPosition !== elementsAmount) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classNames(styles.ProductsGallery, className)}>
      <div className={styles.ProductsGallery__top}>
        <h2>{title}</h2>
        <div className={styles.ProductsGallery__buttons}>
          <button
            className={classNames(
              styles.ProductsGallery__buttonLeftDisabled,
              currentPosition !== 1 && styles.ProductsGallery__buttonLeftActive,
            )}
            onClick={scrollLeft}
          ></button>
          <button
            className={classNames(
              styles.ProductsGallery__buttonRightActive,
              currentPosition === elementsAmount &&
                styles.ProductsGallery__buttonRightDisabled,
            )}
            onClick={scrollRight}
          ></button>
        </div>
      </div>
      <div className={styles.ProductsGallery__bottom} ref={scrollContainerRef}>
        {products.map(product => (
          <ProductCard
            product={product}
            key={product.name}
            className={styles.ProductsGallery__ProductCard}
          />
        ))}
      </div>
    </div>
  );
};
