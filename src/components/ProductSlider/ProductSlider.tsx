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
  discont,
}) => {
  const prevClass = `prev-${id}`;
  const nextClass = `next-${id}`;

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.slider__container}>
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
            loop={true}
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
            className={styles.slider__swiper}
          >
            {products.map(product => (
              <SwiperSlide key={product.id} className={styles.card}>
                <ProductCard product={product} discont={discont || false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
