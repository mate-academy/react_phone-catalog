import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/modules/grid/grid.scss';
import './ProductsSlider.scss';
import './ProductSwiper.scss';

import {
  ReactComponent as ArrowLeft,
} from '../../assets/icons/Chevron(ArrowLeft).svg';
import {
  ReactComponent as ArrowRight,
} from '../../assets/icons/Chevron(ArrowRight).svg';

import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
  title: string,
  btnMod: string,
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  btnMod,
}) => {
  const isDiscount = title.includes('Hot');

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h1 className="title">{title}</h1>

        <div className="products-slider__control-btns">
          <div
            className={`
                products-slider__prev-btn
                products-slider__prev-btn--${btnMod}
                button-nav
              `}
          >
            <ArrowLeft />
          </div>

          <div
            className={`
                products-slider__next-btn
                products-slider__next-btn--${btnMod}
                button-nav
              `}
          >
            <ArrowRight />
          </div>
        </div>
      </div>

      <div className="products-slider__content">
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          modules={[Navigation]}
          navigation={{
            prevEl: `.products-slider__prev-btn--${btnMod}`,
            nextEl: `.products-slider__next-btn--${btnMod}`,
            disabledClass: 'button-nav--disabled',
          }}
          wrapperClass="swiper-product-wrapper"
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },

            380: {
              slidesPerView: 1.6,
              spaceBetween: 10,
            },

            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            660: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            960: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.phoneId}>
              <ProductCard product={product} isDiscount={isDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
