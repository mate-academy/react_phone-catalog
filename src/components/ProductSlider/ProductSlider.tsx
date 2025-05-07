import React, { useContext, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { CatalogContext } from '../../CatalogContext';
import { ProductItem } from '../ProductItem/ProductItem';
import { Phone } from '../../types/Phone';
import { Accessory } from '../../types/Accessory';
import { Tablet } from '../../types/Tablet';

interface SwiperInstance {
  realIndex: number;
  activeIndex: number;
}

type Props = {
  models: Phone[] | Tablet[] | Accessory[] | null;
  sectionName: string;
};



export const ProductSlider: React.FC<Props> = ({ models, sectionName }) => {
  const { setActiveIndex } = useContext(CatalogContext);
  const swiperRef = useRef<SwiperRef>(null);
  const isTablet = useMediaQuery({ query: '(min-width: 640px)' });
  const isDesctop = useMediaQuery({ query: '(min-width: 1200px)' });

  const slidesPerView = () => {
    if (isDesctop) {
      return 4;
    }

    if (isTablet) {
      return 2;
    }

    return 1;
  };

  return (
    <div
      className={`${sectionName}__slider-container product-slider__container`}
    >
      <Swiper
        ref={swiperRef}
        className={`${sectionName}__slider product-slider`}
        modules={[Navigation]}
        slidesPerView={slidesPerView()}
        spaceBetween={16}
        onSwiper={() => {
          if (swiperRef.current) {
            const swiper = swiperRef.current.swiper as SwiperInstance;

            setActiveIndex(swiper.activeIndex);
          }
        }}
        onSlideChange={() => {
          if (swiperRef.current) {
            const swiper = swiperRef.current.swiper as SwiperInstance;

            setActiveIndex(swiper.activeIndex);
          }
        }}
        navigation={{
          prevEl: `.${sectionName}__slider-btn--prev`,
          nextEl: `.${sectionName}__slider-btn--next`,
        }}
      >
        {models &&
          models.map(model => (
            <SwiperSlide
              key={model.id}
              className="brand-new__slide product-slide"
            >
              <ProductItem product={model} section={sectionName} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
