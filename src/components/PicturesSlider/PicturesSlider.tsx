import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import classNames from 'classnames';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type SwiperCore from 'swiper';
import './PicturesSlider.scss';

import bannerAccessories from '../../images/banner-accessories.png';
import bannerPhones from '../../images/banner-phones.png';
import bannerTablets from '../../images/banner-tablets.png';
import { useAppSelector } from '../../hooks/hooks';

const PicturesSlider = () => {
  const swiperRef = useRef<SwiperCore>();
  const { theme } = useAppSelector(state => state.theme);

  return (
    <div className="picturesSwiper_container">
      <div
        className={classNames('icon_container', 'icon_container_left')}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <div
          className={classNames('icon', 'icon_left', {
            'dark-theme': theme === 'dark',
            'light-theme': theme === 'light',
          })}
        />
      </div>

      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onBeforeInit={swiper => {
          swiperRef.current = swiper;
        }}
        className="picturesSwiper"
      >
        <SwiperSlide>
          <img
            src={bannerPhones}
            alt="banner-phones"
            style={{
              width:
                window.innerWidth >= 1200
                  ? '110%'
                  : window.innerWidth >= 640
                    ? '100%'
                    : '100%',
              objectFit: 'cover',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerTablets}
            alt="banner-tablets"
            style={{
              width:
                window.innerWidth >= 1200
                  ? '110%'
                  : window.innerWidth >= 640
                    ? '90%'
                    : '100%',

              height:
                window.innerWidth >= 1200
                  ? '120%'
                  : window.innerWidth >= 640
                    ? '100%'
                    : '100%',

              objectFit: 'cover',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={bannerAccessories}
            alt="banner-accessories"
            style={{
              width:
                window.innerWidth >= 1200
                  ? '104%'
                  : window.innerWidth >= 640
                    ? '100%'
                    : '100%',

              objectFit: 'cover',
            }}
          />
        </SwiperSlide>
      </Swiper>

      <div
        className={classNames('icon_container', 'icon_container_right')}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <div
          className={classNames('icon', 'icon_right', {
            'dark-theme': theme === 'dark',
            'light-theme': theme === 'light',
          })}
        />
      </div>
    </div>
  );
};

export default PicturesSlider;
