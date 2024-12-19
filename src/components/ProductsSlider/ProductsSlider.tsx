import React, { useRef, useState } from 'react';
import './ProductsSlider.scss';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Product } from '../types/Product';
import { ProductCard } from '../ProductCard';
import { Navigation } from 'swiper/modules';
import { ArrowIcon } from '../Icons/ArrowIcon';
import cn from 'classnames';

type SwRef = SwiperRef & {
  slidePrev: VoidFunction;
  slideNext: VoidFunction;
};

type Props = {
  newModels: Product[];
  fullPrice: boolean;
};

export const ProductsSlider: React.FC<Props> = ({ newModels, fullPrice }) => {
  const swiperRef = useRef<SwRef>();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDisabledPrev = activeIndex === 0;
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  return (
    <div className="products-slider">
      <div className="products-slider__actions">
        <button
          className={cn(
            'products-slider__button products-slider__button-prev',
            {
              'products-slider__button--disabled': isDisabledPrev,
            },
          )}
          id={'bannerPrev'}
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          disabled={isDisabledPrev}
        >
          <ArrowIcon disabled={isDisabledPrev} />
        </button>
        <button
          className={cn(
            'products-slider__button products-slider__button-next',
            {
              'products-slider__button--disabled': isDisabledNext,
            },
          )}
          id={'bannerNext'}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          disabled={isDisabledNext}
        >
          <ArrowIcon disabled={isDisabledNext} />
        </button>
      </div>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper as unknown as SwRef;
        }}
        onSlideChange={sw => {
          setActiveIndex(sw.activeIndex);
          setIsDisabledNext(sw.isEnd);
        }}
        className="products-swiper"
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1.5,
          },
          640: {
            width: 640,
            slidesPerView: 2.5,
          },
          768: {
            width: 730,
            slidesPerView: 2.5,
          },
          1199: {
            width: 1140,
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
      >
        {newModels.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} fullPrice={fullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
