import React, { useEffect, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import navigationStyle from './Navigation.module.scss';
import { useWindowResize } from '../../windowResize';

import { Swiper, SwiperSlide } from 'swiper/react';
import Sidebar from '../Sidebar';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';

import { useMenu } from '../../context/MenuContext';

const WelcomeSlider: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const [currentImagePath, setCurrentImagePath] = useState<string[]>([
    'public/img/Banner-mobile.5ab4e0f94787219dc791.png',
    '/img/banner-mobil-3.88470ad4d90a78897a60.png',
    '/img/banner-mobile-2.00d157dda3b7eb6a4ac1.png',
  ]);

  const updateImageBasedOnWidth = () => {
    let newPathFirstImage = 'img/mobile-banner.svg';
    let newPathSecondImage = 'public/img/banner-3.0faf6182921a87c68d96.png';
    let newPathThirdImage = 'public/img/banner-2.9b3f155545f266760333.png';

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
  };

  useEffect(() => {
    updateImageBasedOnWidth();

    window.addEventListener('resize', updateImageBasedOnWidth);

    return () => {
      window.removeEventListener('resize', updateImageBasedOnWidth);
    };
  }, []);

  const { width } = useWindowResize();

  console.log(currentImagePath);

  console.log(isMenuOpen);
  console.log(width);

  let widthSwiper = '';

  if (width < 1200 && width >= 640) {
    widthSwiper = `${1040 - (1200 - width)}`;
  }

  if (width < 640) {
    widthSwiper = 'auto';
  }

  if (width >= 1200) {
    widthSwiper = '1040';
  }

  if (+widthSwiper < 592) {
    widthSwiper = '592';
  }

  widthSwiper = widthSwiper === 'auto' ? 'auto' : `${widthSwiper}px`;

  console.log(widthSwiper);

  return (
    <div id="#" className={welcomeStyles.header}>
      <HeaderLogoMenu />

      <div className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </div>

      <div className={welcomeStyles.header__wrapper}>
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
          style={{ width: `${widthSwiper}` }}
          spaceBetween={1}
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
            <Link to="/phones?quantity=16&sort=newest">
              <img
                src={`${currentImagePath[0]}`}
                className={`${welcomeStyles['header__swiper-2']} ${welcomeStyles.header__swiper}`}
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="tablets?quantity=16&sort=newest">
              <img
                src={`${currentImagePath[2]}`}
                className={`${welcomeStyles['header__swiper-1']} ${welcomeStyles.header__swiper}`}
              />
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="accessories?quantity=16&sort=newest">
              <img
                // src="public\img\banner-mobil-3.88470ad4d90a78897a60.png"
                src={`${currentImagePath[1]}`}
                // style={{
                //   backgroundImage: `url('public/img/banner-mobil-3.88470ad4d90a78897a60.png')`,
                // }}
                className={`${welcomeStyles['header__swiper-0']} ${welcomeStyles.header__swiper}`}
              />
            </Link>
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

      {isMenuOpen && <Sidebar />}
    </div>
  );
};

export default WelcomeSlider;
