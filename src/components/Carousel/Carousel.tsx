import React, { useContext, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { CategoriesContext } from '../../context/CategoriesContext';
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
  const { categories } = useContext(CategoriesContext);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            slidesPerView={1}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            loop={true}
            autoplay={{ delay: 3000 }}
            onSlideChange={swiper => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={swiper => {
              const navigationParams = swiper.params.navigation;

              if (navigationParams && typeof navigationParams !== 'boolean') {
                navigationParams.prevEl = prevButtonRef.current;
                navigationParams.nextEl = nextButtonRef.current;

                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            grabCursor={true}
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
        onClick={index => swiperRef.current?.swiper.slideToLoop(index)}
      />
    </div>
  );
};
