import styles from './ProductSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useState } from 'react';
import { Product } from '../../types/Product';

import { ProductCard } from '../ProductCard';
type Props = {
  title: string;
  showDiscount: boolean;
  products: Product[];
};
export const ProductSlider: React.FC<Props> = ({
  title,
  showDiscount,
  products,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.slider__top}>
          <h2 className={styles.slider__title}>{title}</h2>
          <div className={styles.slider__btns}>
            <button
              ref={setPrevEl}
              className={`${styles.slider__btn} ${styles['slider__btn--left']}`}
            ></button>
            <button
              ref={setNextEl}
              className={`${styles.slider__btn} ${styles['slider__btn--right']}`}
            ></button>
          </div>
        </div>
        <div className={styles.slider__container}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl,
              nextEl,
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {products.map(p => (
              <SwiperSlide
                key={p.id}
                className={styles.slider__container__swSlider}
              >
                <ProductCard product={p} discount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
