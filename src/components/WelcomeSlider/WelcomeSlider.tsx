import React, { useEffect, useRef, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import navigationStyle from './Navigation.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import Sidebar from '../Sidebar';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WelcomeSlider: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(isMenuOpen);

  return (
    <div id="#">
      <HeaderLogoMenu setIsMenuOpen={setIsMenuOpen} iconClass={'icon--menu'} />

      <div className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </div>

      <div className={welcomeStyles.header}>
        {/* <div
          className={`${navigationStyle['swiper-button-prev']} ${navigationStyle['swiper-button']}`}
        >
          <img src="public\img\chevron-arrow_left.svg" alt="" />
        </div> */}

        <div className="navigation-button-prev">
          <div
            className={`${navigationStyle['navigation-button']} ${navigationStyle['navigation-button--left']}`}
          >
            <img src="public\img\chevron-arrow_left.svg" alt="img" />
          </div>
        </div>

        <Swiper
          className={paginationStyle.swiper}
          modules={[Scrollbar, Pagination, Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          enabled={true}
          pagination={{
            clickable: true,
            type: 'bullets',
            el: `.${paginationStyle.pagination}`,
            bulletClass: paginationStyle['swiper-custom-pagination-bullet'],
            bulletActiveClass:
              paginationStyle['swiper-custom-pagination-bullet--active'],
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.navigation-button-next',
            prevEl: '.navigation-button-prev',
          }}
          scrollbar={{ draggable: true }}
          loop={true}
        >
          <SwiperSlide>
            <img
              src="public\img\Banner-mobile.5ab4e0f94787219dc791.png"
              alt="f"
              className={`${welcomeStyles['header__swiper-2']} ${welcomeStyles.header__swiper}`}
            />
          </SwiperSlide>

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
        </Swiper>

        <div className="navigation-button-next">
          <div
            className={`${navigationStyle['navigation-button']} ${navigationStyle['navigation-button--right']}`}
          >
            <img src="public\img\chevron-arrow-right.svg" alt="arrow rigth" />
          </div>
        </div>
      </div>

      <div className={paginationStyle.pagination}></div>

      <Sidebar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default WelcomeSlider;
