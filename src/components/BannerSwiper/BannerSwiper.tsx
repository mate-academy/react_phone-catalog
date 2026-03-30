import style from './BannerSwiper.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
import { useRef } from 'react';
import {
  IMAGES_FOR_BUNNER,
  IMAGES_FOR_MOBILE_BUNNER,
} from '../../constants/categories/categories';
import { Link } from 'react-router-dom';
import { useTheme } from '../../store/ThemeContext';
import { ICONS } from '../../assets/icons';

export const SwiperBanner = () => {
  const isMobile = useIsMobile();
  const swiperRef = useRef<SwiperClass | null>(null);
  const { theme } = useTheme();

  return (
    <>
      {!isMobile ? (
        <div className={style.swiperBanner}>
          <button
            className={style.swiperBanner__button}
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
          >
            <img
              src={theme === 'dark' ? ICONS.darkPrevActive : ICONS.prevActive}
              alt="Prev"
            />
          </button>

          <Swiper
            className={style.swiperBanner__swiper}
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: `.${style.swiperBanner__bullets}`,
              bulletClass: style.swiperBanner__bullet,
              bulletActiveClass: style.swiperBanner__bullet__active,
            }}
          >
            {IMAGES_FOR_BUNNER.map((image, index) => (
              <SwiperSlide key={index}>
                <Link to="/phones/apple-iphone-14-pro-128gb-spaceblack">
                  <img
                    src={image}
                    alt={`SwiperBanner ${index + 1}`}
                    className={style.swiperBanner__img}
                  />
                </Link>
              </SwiperSlide>
            ))}

            <div className={style.swiperBanner__bullets}></div>
          </Swiper>

          <button
            className={style.swiperBanner__button}
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
          >
            <img
              src={theme === 'dark' ? ICONS.darkNextActive : ICONS.nextActive}
              alt="Next"
            />
          </button>
        </div>
      ) : (
        <div className={style.swiperBannerMobile}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: `.${style.swiperBannerMobile__bullets}`,
              bulletClass: style.swiperBannerMobile__bullet,
              bulletActiveClass: style.swiperBannerMobile__bullet__active,
            }}
          >
            {IMAGES_FOR_MOBILE_BUNNER.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`SwiperBanner ${index + 1}`}
                  className={style.swiperBannerMobile__img}
                />
              </SwiperSlide>
            ))}

            <div className={style.swiperBannerMobile__bullets}></div>
          </Swiper>
        </div>
      )}
    </>
  );
};
