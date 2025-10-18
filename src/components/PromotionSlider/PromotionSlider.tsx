import React, { FC } from 'react';
import vaforiteImg from './../../images/icons/Favourites (Heart Like).svg';
import vaforiteImgSelected from './../../images/icons/Favourites (Heart Like)_2.svg';
import fakeImg from './../../images/img/phones//apple-iphone-11/black/00.webp';

import './ProductCard.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { ProductCard } from '../ProductCard';

type Props = {
  products: string[];
};

export const PromotionSlider: FC<Props> = ({ products }) => {
  return (
    <>
      <div className="slider__nav">
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
      </div>
      <Swiper
        className="swiper-slider"
        modules={[Navigation, A11y]}
        slidesPerView={4}
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        // navigation
        pagination={{ clickable: true }}
      >
        {products.map(product => (
          <SwiperSlide>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
