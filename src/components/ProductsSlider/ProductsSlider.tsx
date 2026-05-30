import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './ProductsSlider.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  heading: string;
  products: Product[];
  hasDiscount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  heading,
  products,
  hasDiscount,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperInstance) {
      if (
        typeof swiperInstance.params.navigation !== 'boolean' &&
        swiperInstance.params.navigation
      ) {
        swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
        swiperInstance.params.navigation.nextEl = navigationNextRef.current;

        swiperInstance.navigation.update();
      }
    }
  }, [swiperInstance]);

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSlider__container}>
        <h1 className={styles.productsSlider__heading}>{heading}</h1>
        <div className={styles.productsSlider__navigation}>
          <div
            ref={navigationPrevRef}
            className={styles.productsSlider__prevEl}
          />
          <div
            ref={navigationNextRef}
            className={styles.productsSlider__nextEl}
          />
        </div>
      </div>
      <Swiper
        className={styles.productsSlider__slides}
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
          disabledClass: styles.productsSlider__navigationDisabled,
        }}
        onSwiper={setSwiperInstance}
        slidesPerView={'auto'}
        spaceBetween={16}
        centeredSlides={false}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            centeredSlides: false,
          },
        }}
      >
        {products.map(product => (
          <SwiperSlide
            key={product.id}
            className={styles.productsSlider__slide}
          >
            <ProductCard product={product} hasDiscount={hasDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
