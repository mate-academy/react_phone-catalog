import React, { useEffect, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import navigationStyle from './Navigation.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import Sidebar from '../Sidebar';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WelcomeSlider: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImagePath, setCurrentImagePath] = useState<string[]>([
    'public/img/Banner-mobile.5ab4e0f94787219dc791.png',
    '/img/banner-mobil-3.88470ad4d90a78897a60.png',
    '/img/banner-mobile-2.00d157dda3b7eb6a4ac1.png',
  ]);

  const updateImageBasedOnWidth = () => {
    let newPathFirstImage = 'img/mobile-banner.svg'; // Дефолтне значення
    let newPathSecondImage = 'public/img/banner-3.0faf6182921a87c68d96.png';
    let newPathThirdImage = 'public/img/banner-2.9b3f155545f266760333.png'; //

    if (window.innerWidth >= 640) {
      newPathFirstImage = 'public/img/face-banner.svg';
      setCurrentImagePath([
        newPathFirstImage,
        newPathSecondImage,
        newPathThirdImage,
      ]);
    }

    if (window.innerWidth <= 640) {
      newPathFirstImage = 'public/img/Banner-mobile.5ab4e0f94787219dc791.png';
      newPathSecondImage = '/img/banner-mobil-3.88470ad4d90a78897a60.png';
      newPathThirdImage = '/img/banner-mobile-2.00d157dda3b7eb6a4ac1.png';
      setCurrentImagePath([
        newPathFirstImage,
        newPathSecondImage,
        newPathThirdImage,
      ]);
    }

    if (window.innerWidth <= 1200) {

    }

  };

  useEffect(() => {
    updateImageBasedOnWidth();

    window.addEventListener('resize', updateImageBasedOnWidth);

    return () => {
      window.removeEventListener('resize', updateImageBasedOnWidth);
    };
  }, []);

  console.log(currentImagePath);

  console.log(isMenuOpen);

  return (
    <div id="#">
      <HeaderLogoMenu
        setIsMenuOpen={setIsMenuOpen}
        iconClass={'icon--menu'}
        isOpen={isMenuOpen}
      />

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
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          navigation={{
            nextEl: '.navigation-button-next',
            prevEl: '.navigation-button-prev',
          }}
          scrollbar={{ draggable: true }}
          loop={true}
        >
          <SwiperSlide>
            <a href="#">
              <img
                src={`${currentImagePath[0]}`}
                className={`${welcomeStyles['header__swiper-2']} ${welcomeStyles.header__swiper}`}
              />
            </a>
          </SwiperSlide>

          <SwiperSlide>
            <a href="#">
              <img
                // src="public\img\banner-mobil-3.88470ad4d90a78897a60.png"
                src={`${currentImagePath[1]}`}
                // style={{
                //   backgroundImage: `url('public/img/banner-mobil-3.88470ad4d90a78897a60.png')`,
                // }}
                className={`${welcomeStyles['header__swiper-0']} ${welcomeStyles.header__swiper}`}
              />
            </a>
          </SwiperSlide>

          <SwiperSlide>
            <a href="#">
              <img
                src={`${currentImagePath[2]}`}
                className={`${welcomeStyles['header__swiper-1']} ${welcomeStyles.header__swiper}`}
              />
            </a>
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

      <Routes>
        <Route
          path="/burger-menu"
          element={
            <Sidebar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <Sidebar isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
    </div>
  );
};

export default WelcomeSlider;
