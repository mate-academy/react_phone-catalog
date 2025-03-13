import React from 'react';
import { Card } from '../Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSwiper.module.scss';
import { Product } from '../../types/Product';

interface NewModelsSliderProps {
  name: string;
  products: Product[];
}

export const ProductSwiper: React.FC<NewModelsSliderProps> = ({
  name,
  products,
}) => {
  const newModels = products.filter(product => product.year === 2022);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{name}</h2>

        <div className={styles.slider__controls}>
          <button className={styles.slider__button} id="prev">
            &lt;
          </button>
          <button className={styles.slider__button} id="next">
            &gt;
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={'auto'}
        navigation={{ nextEl: '#next', prevEl: '#prev' }}
        className={styles.slider__container}
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
