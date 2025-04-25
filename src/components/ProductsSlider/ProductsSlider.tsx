import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import React, { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import ArrowButton from '../ArrowButton/ArrowButton';

import 'swiper/css';

type Props = {
  title: string;
  visibleProducts: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, visibleProducts }) => {
  const [currSlide, setCurrSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const isNewModelsBlock = title === 'Brand new models';

  const handleClickArrow = (direction: string) => {
    if (direction === 'left') {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
    } else {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }
  };

  const isPrevBtnDisabled = currSlide === 0;
  const isNextBtnDisabled = currSlide === visibleProducts.length - 1;

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <ArrowButton
            direction="left"
            handleClickArrow={handleClickArrow}
            isBtnDisabled={isPrevBtnDisabled}
          />
          <ArrowButton
            direction="right"
            handleClickArrow={handleClickArrow}
            isBtnDisabled={isNextBtnDisabled}
          />
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        onSlideChange={swiper => setCurrSlide(swiper.activeIndex)}
        onSwiper={swiper => (swiperRef.current = swiper)}
        watchOverflow={true}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          380: {
            slidesPerView: 1.5,
          },
          480: {
            slidesPerView: 2,
          },
          580: {
            slidesPerView: 2.5,
          },
          780: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {visibleProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              isNewModelsBlock={isNewModelsBlock}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
