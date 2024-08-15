import { Product } from '../../types/Product';
import { ProductCards } from '../ProductCards';

import React, { useRef } from 'react';
import { SwiperRef } from 'swiper/react';

import { CarouselHeader } from './CarouselHeader';
import styles from './ProductList.module.scss';
import { Slider } from './Slider/Slider';

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
        <CarouselHeader
          title={title}
          handlePrevSlide={handlePrevSlide}
          handleNextSlide={handleNextSlide}
        />
      )}

      {isHaveSlider ? (
        <Slider
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
