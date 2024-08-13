import { Product } from '../../types/Product';
import { ProductCards } from '../ProductCards';
import { ProductListHeader } from '../ProductListHeader/ProductListHeader';
import { ProductListSlider } from '../ProductListSlider';

import React, { useRef } from 'react';
import { SwiperRef } from 'swiper/react';

import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  isHaveSlider: boolean;
  title?: string;
  isHotPrice?: boolean;
};

export const ProductList: React.FC<Props> = ({
  products,
  isHaveSlider,
  title,
  isHotPrice = false,
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <section className={styles.products}>
      {isHaveSlider && (
        <ProductListHeader
          title={title}
          handlePrevSlide={handlePrevSlide}
          handleNextSlide={handleNextSlide}
        />
      )}

      {isHaveSlider ? (
        <ProductListSlider
          initialRef={swiperRef}
          products={products}
          isHotPrice={isHotPrice}
        />
      ) : (
        <div className={styles.wrapper}>
          <ProductCards isHotPrice={isHotPrice} products={products} />
        </div>
      )}
    </section>
  );
};
