import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Swiper as SwiperType } from 'swiper/types';

import { ProductCard } from '../../../ProductCard';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
  prevBtnRef: React.RefObject<HTMLButtonElement>;
  nextBtnRef: React.RefObject<HTMLButtonElement>;
};

export const ProductCarousel: React.FC<Props> = ({
  products,
  prevBtnRef,
  nextBtnRef,
}) => {
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
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
    </Swiper>
  );
};
