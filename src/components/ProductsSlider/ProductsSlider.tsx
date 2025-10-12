/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import 'swiper/css';
import './ProductsSlider.scss';

import leftArrowActive from '../../images/icons/arrow-left-active.svg';
import leftArrowDisabled from '../../images/icons/arrow-left-disabled.svg';
import rightArrowActive from '../../images/icons/arrow-right-active.svg';
import rightArrowDisabled from '../../images/icons/arrow-right-disabled.svg';

type ProductSliderProps = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const getMaxIndex = () => Math.max(products.length - slidesPerView, 0);

  return (
    <div className="products-slider">
      <div className="products-slider__managment">
        <div className="products-slider__title">{title}</div>
        <div className="products-slider__buttons">
          <button
            className={`products-slider__button ${currentIndex === 0 ? 'products-slider__button--disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img
              src={currentIndex === 0 ? leftArrowDisabled : leftArrowActive}
              alt="Previous"
            />
          </button>
          <button
            className={`products-slider__button ${currentIndex === getMaxIndex() ? 'products-slider__button--disabled' : ''}`}
            onClick={handleNext}
            disabled={currentIndex === getMaxIndex()}
          >
            <img
              src={
                currentIndex === getMaxIndex()
                  ? rightArrowDisabled
                  : rightArrowActive
              }
              alt="Next"
            />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
          setSlidesPerView(swiper.params.slidesPerView as number);
        }}
        onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
        spaceBetween={24}
        slidesPerView={4}
        speed={600}
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 12 },
          480: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="products-slider__swiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.itemId}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
