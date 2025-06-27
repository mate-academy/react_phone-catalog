import React, { useEffect, useRef, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WelcomeSlider: React.FC = () => {
  const paginationRef = useRef<unknown>(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  useEffect(() => {
    if (paginationRef.current) {
      setSwiperInitialized(true); // Встановлюємо, що реф готовий, можна рендерити Swiper
    }
  }, [paginationRef.current]); // Залежність від ref.current

  return (
    <>
      <div className={topBatStyles.header}>
        <div className={topBatStyles['top-bar']}>
          <a href="#" className="top-bar__logo">
            <img src="public\img\gadgets-logo.png" alt="img-logo" />
          </a>

          <a
            href="#burger-menu"
            className={`${iconStyles.icon} ${iconStyles['icon--menu']}`}
          ></a>
        </div>
      </div>

      <div className={welcomeStyles.pagination}></div>

      <Swiper
        modules={[Scrollbar, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: '.pagination',
          bulletClass: paginationStyle['swiper-custom-pagination-bullet'],
          bulletActiveClass:
            paginationStyle['swiper-custom-pagination-bullet--active'],

          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }}
        scrollbar={{ draggable: true }}
        loop={true}
        onSwiper={swiper => {
          paginationRef.current = swiper;
        }}
        // onInit={swiper => {
        //   if (
        //     swiper.params.pagination &&
        //     typeof swiper.params.pagination !== 'boolean'
        //   ) {
        //     // eslint-disable-next-line no-param-reassign
        //     swiper.params.pagination.el = paginationRef.current;
        //   }

        //   swiper.pagination.update();
        // }}
      >
        <SwiperSlide>
          <img
            src="public\img\banner-mobil-3.88470ad4d90a78897a60.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-0']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="public\img\banner-mobile-2.00d157dda3b7eb6a4ac1.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-1']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="public\img\Banner-mobile.5ab4e0f94787219dc791.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-2']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>

      <div className="pagination"></div>

      <div className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </div>
    </>
  );
};

export default WelcomeSlider;
