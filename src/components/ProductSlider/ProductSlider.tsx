import React from 'react';
import styles from './ProductSlider.module.scss';

import { ProductCard } from '../ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon } from '../Icon';
import { SliderType } from '../../types/SliderType';

export const ProductSlider: React.FC<SliderType> = ({
  title,
  products,
  id,
  discount,
}) => {
  const prevClass = `prev-${id}`;
  const nextClass = `next-${id}`;

  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <div className={styles.slider__title}>{title}</div>
        <div className={styles.slider__buttons}>
          <button className={prevClass}>
            <Icon name="arrowleft" />
          </button>
          <button className={nextClass}>
            <Icon name="arrowright" />
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        loop={false}
        observer={true}
        observeParents={true}
        autoHeight={false}
        setWrapperSize={true}
        resizeObserver={true}
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        className={styles.swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.card}>
            <ProductCard product={product} discount={discount || false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
