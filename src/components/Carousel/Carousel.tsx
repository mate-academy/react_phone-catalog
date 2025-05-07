import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useCategories } from '../../context/CategoriesContext';
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import carouselStyles from './Carousel.module.scss';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { Banner } from './components/Banner';
// eslint-disable-next-line max-len
import { CarouselPagination } from './components/CarouselPagination/CarouselPagination';
import { IconButton } from '../IconButton/IconButton';

export const Carousel = () => {
  const { categories } = useCategories();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!categories.length) {
    return null;
  }

  return (
    <div className={carouselStyles.carousel}>
      <div className={carouselStyles.carousel__sliderWrapper}>
        <IconButton
          ref={prevButtonRef}
          className={carouselStyles.carousel__prevButton}
          iconDataPath={ICON_DATA_PATHS.ARROW.LEFT}
        />
        <IconButton
          ref={nextButtonRef}
          className={carouselStyles.carousel__nextButton}
          iconDataPath={ICON_DATA_PATHS.ARROW.RIGHT}
        />

        <div className={carouselStyles.carousel__slider}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            slidesPerView={1}
            loop
            grabCursor
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            autoplay={{ delay: 3000 }}
            onSlideChange={swiper => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={swiper => (swiperRef.current = swiper)}
          >
            {categories.map(category => (
              <SwiperSlide
                key={category.name}
                className={carouselStyles.carousel__slide}
              >
                <Banner category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <CarouselPagination
        categories={categories}
        activeIndex={activeIndex}
        onClick={index => swiperRef.current?.slideToLoop(index)}
      />
    </div>
  );
};
