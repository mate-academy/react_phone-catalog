import React, { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import './PromotionSlider.scss';

type Props = {
  products: Product[];
  title: string;
};

export const PromotionSlider: FC<Props> = ({ products, title }) => {
  return (
    <>
      <section className="slider">
        <div className="container slider__container">
          <div className="slider__body">
            <h2 className="slider__title">{title}</h2>
            <div className="slider__nav">
              <button className="swiper-button-prev slider-prev"></button>
              <button className="swiper-button-next slider-next"></button>
            </div>
          </div>
        </div>
        <Swiper
          className="swiper-slider"
          modules={[Navigation, A11y]}
          slidesPerView={4}
          spaceBetween={16}
          navigation={{
            nextEl: '.swiper-button-prev',
            prevEl: '.swiper-button-next',
          }}
          // navigation
          pagination={{ clickable: true }}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
