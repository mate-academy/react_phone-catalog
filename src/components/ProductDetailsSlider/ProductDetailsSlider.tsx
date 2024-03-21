import React, { memo, useMemo } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/scss';

import { Loader } from '../Loader';

import './ProductDetailsSlider.scss';

type Props = {
  images: string[] | undefined;
  isLoading: boolean;
};

type SwiperDirectionType = 'horizontal' | 'vertical' | undefined;

export const ProductDetailsSlider: React.FC<Props> = memo(
  ({ images, isLoading }) => {
    const swiperConfig = useMemo(
      () => ({
        modules: [Pagination],
        direction: 'vertical' as SwiperDirectionType,
        pagination: {
          el: '.ProductDetailsSlider__pagination',
          clickable: true,
          bulletClass: 'ProductDetailsSlider__paginationButton',
          bulletActiveClass: 'ProductDetailsSlider__paginationButton--active',
          renderBullet: (index: number, className: string) => {
            if (images) {
              return `
          <span class="${className}">
            <img src="${images[index]}" alt="Pagination bullet ${index}" class="ProductDetailsSlider__paginationImg" />
          </span>
        `;
            }

            return '';
          },
        },
      }),
      [images],
    );

    return isLoading ? (
      <section className="ProductDetails__slider">
        <Loader />
      </section>
    ) : (
      <section className="ProductDetailsSlider ProductDetails__slider">
        <div className="ProductDetailsSlider__pagination" />

        <Swiper {...swiperConfig} className="ProductDetailsSlider__swiper">
          {images?.map((path, index) => (
            <SwiperSlide key={path} className="ProductDetailsSlider__slide">
              <img
                src={path}
                alt={`Slide ${index}`}
                className="ProductDetailsSlider__picture"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  },
);
