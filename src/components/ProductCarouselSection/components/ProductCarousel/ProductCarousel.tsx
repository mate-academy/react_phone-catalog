import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Swiper as SwiperType } from 'swiper/types';

import { ProductCard } from '../../../ProductCard';
import { Product } from '../../../../types/Product';

import styles from './ProductCarousel.module.scss';
import { skeletonProduct } from '../../../../utils/Skeletons/skeletonProduct';

type Props = {
  products: Product[];
  prevBtnRef: React.RefObject<HTMLButtonElement>;
  nextBtnRef: React.RefObject<HTMLButtonElement>;
  isLoading?: boolean;
};

export const ProductCarousel: React.FC<Props> = ({
  products,
  prevBtnRef,
  nextBtnRef,
  isLoading = false,
}) => {
  const location = useLocation();
  const swiperRef = useRef<SwiperType | null>(null);

  const onBeforeInit = (swiper: SwiperType) => {
    Object.assign(swiper.params.navigation!, {
      prevEl: prevBtnRef.current ?? undefined,
      nextEl: nextBtnRef.current ?? undefined,
    });
  };

  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: prevBtnRef.current,
        prevEl: nextBtnRef.current,
      }}
      onBeforeInit={onBeforeInit}
      spaceBetween={16}
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper;
      }}
      breakpoints={{
        0: {
          slidesPerView: 1.25,
          centeredSlides: true,
        },
        640: {
          slidesPerView: 2.5,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 4,
          centeredSlides: false,
        },
      }}
    >
      {products.map((product, index) => (
        <SwiperSlide
          key={`${location.pathname}-${product.id}-${index}`}
          className={styles['product-carousel__swiper-slide']}
        >
          {isLoading ? (
            <ProductCard product={skeletonProduct} variant="skeleton" />
          ) : (
            <ProductCard product={product} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
