// core version + navigation, pagination modules:
import { Link } from 'react-router-dom';
import carouseClass from './carousel.module.scss';
import swipersList from '../../../../../public/api/headerSwiperList.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/effect-coverflow';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

export const Carousel = () => {
  return (
    <Swiper
      className={`${carouseClass.carousel}`}
      modules={[Navigation, Pagination, EffectCoverflow]}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      spaceBetween={100}
      slidesPerView={1}
      navigation={{
        nextEl: `.${carouseClass['carousel__nav--next']}`,
        prevEl: `.${carouseClass['carousel__nav--prev']}`,
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{
        clickable: true,
      }}
    >
      {swipersList.map(swiper => (
        <SwiperSlide
          className={`${carouseClass.carousel__item}`}
          key={swiper.key}
        >
          {({ isActive }) => (
            <Link
              to={swiper.to}
              className={cn(carouseClass.carousel__link, {
                [carouseClass['carousel__link--active']]: isActive,
              })}
            >
              <picture>
                <source srcSet={swiper.tabletImg} media="(min-width: 640px)" />
                <source
                  srcSet={swiper.desktopImg}
                  media="(min-width: 1200px)"
                />
                <img
                  src={swiper.mobileImg}
                  alt={swiper.alt}
                  className={cn(carouseClass.carousel__img, {
                    [carouseClass['carousel__img--active']]: isActive,
                  })}
                  loading="lazy"
                />
              </picture>
            </Link>
          )}
        </SwiperSlide>
      ))}
      <div
        className={cn(
          carouseClass.carousel__nav,
          carouseClass['carousel__nav--prev'],
        )}
      ></div>
      <div
        className={cn(
          carouseClass.carousel__nav,
          carouseClass['carousel__nav--next'],
        )}
      ></div>
    </Swiper>
  );
};
