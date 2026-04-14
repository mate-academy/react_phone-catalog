import styles from './ProductSlider.module.scss';
import { Catalog } from '../../../../components/Catalog';
import { Product } from '../../../shared/types/Product';
import React, { useState } from 'react';
import { Button } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';

interface Props {
  title: string;
  products: Product[];
  isDiscountHidden: boolean;
}

export const ProductSlider: React.FC<Props> = ({ title, products, isDiscountHidden }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = products.length - 4;

  const goLeft = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
  const goRight = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));

  return (
    <>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <div className={styles.arrows}>
          <Button variant="slider" onClick={goLeft} disabled={currentIndex === 0}>
            <Icon variant="arrow-left" />
          </Button>
          <Button variant="slider" onClick={goRight} disabled={currentIndex >= maxIndex}>
            <Icon variant="arrow-right" />
          </Button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 288}px)` }}>
          <Catalog
            products={products}
            isDiscountHidden={isDiscountHidden}
            className={styles.sliderCatalog}
          />
        </div>
      </div>
    </>
  );
};
