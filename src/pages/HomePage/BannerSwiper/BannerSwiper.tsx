/* eslint max-len: "off" */
import React, { useRef } from 'react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BannerSwiper.scss';
import { SkeletonBannerSwiper } from '../../../components/Skeletons/SkeletonBannerSwiper/SkeletonBannerSwiper';
import { useTheme } from '../../../components/context/ThemeContext';
type Props = {
  isSkeleton?: boolean;
};

export const BannerSwiper: React.FC<Props> = ({ isSkeleton }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const { theme } = useTheme();

  const banner = [
    './img/banner-accessories.png',
    './img/banner-phones.png',
    './img/banner-tablets.png',
    './img/banner-gato.png',
    './img/banner-gato-2.png',
  ];

  return (
    <div className="banner">
      <div className="banner__slider">
        <div className="banner__slider--container">
          <button
            className="button__arrow--arrowLeft
              swiper-buttons
              has-shadow-cursor"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? './img/icons/Arrow-Left_icon.svg'
                  : './img/icons/Arrow-Left_dark.svg'
              }
              alt="Arrow Left"
            />
          </button>

          {isSkeleton ? (
            <SkeletonBannerSwiper />
          ) : (
            <Swiper
              onSwiper={swiper => (swiperRef.current = swiper)}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                bulletClass: 'custom-bullet',
                bulletActiveClass: 'custom-bullet-active',
              }}
              className="banner__swiper"
            >
              {banner.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="banner__swiper--card"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <button
            className="button__arrow--arrowRight
              swiper-buttons
              has-shadow-cursor"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img
              className="icon"
              src={
                theme === 'light'
                  ? './img/icons/Arrow-Right_icon.svg'
                  : './img/icons/Arrow-Right_dark.svg'
              }
              alt="Arrow Right"
            />
          </button>
        </div>
      </div>

      <div className="pagination-container">
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
