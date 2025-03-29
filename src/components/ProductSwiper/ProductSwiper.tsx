import React, { useState, useRef } from 'react';
import { Card } from '../Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSwiper.module.scss';
import { Product } from '../../types/Product';
import { Swiper as SwiperType } from 'swiper';

interface NewModelsSliderProps {
  name: string;
  products: Product[];
}

export const ProductSwiper: React.FC<NewModelsSliderProps> = ({
  name,
  products,
}) => {
  const newModels = products.filter(product => product.year === 2022);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleInit = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{name}</h2>

        <div className={styles.slider__controls}>
          <button
            className={styles.slider__button}
            id="prev"
            disabled={isBeginning}
          >
            &lt;
          </button>
          <button className={styles.slider__button} id="next" disabled={isEnd}>
            &gt;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        loop={false}
        centeredSlides={false}
        centerInsufficientSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        navigation={{ nextEl: '#next', prevEl: '#prev' }}
        className={styles.slider__container}
        onInit={handleInit}
        onSlideChange={handleSlideChange}
        onSwiper={swiper => (swiperRef.current = swiper)}
      >
        {newModels.map(product => (
          <SwiperSlide key={product.id} className={styles.slider__slide}>
            <Card card={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
