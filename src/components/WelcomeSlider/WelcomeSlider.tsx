import React, { useEffect, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import navigationStyle from './Navigation.module.scss';
import { useWindowResize } from '../../windowResize';

import { Swiper, SwiperSlide } from 'swiper/react';
import Sidebar from '../Sidebar';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

import { Pagination, Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';

import { useMenu } from '../../context/MenuContext';

const WelcomeSlider: React.FC = () => {
  const { isMenuOpen } = useMenu();
  const [currentImagePath, setCurrentImagePath] = useState<string[]>([
    './img/Banner-mobile.5ab4e0f94787219dc791.png',
    '/img/banner-mobil-3.88470ad4d90a78897a60.png',
    '/img/banner-mobile-2.00d157dda3b7eb6a4ac1.png',
  ]);

  const updateImageBasedOnWidth = () => {
    let newPathFirstImage = 'img/mobile-banner.svg';
    let newPathSecondImage = './img/banner-3.0faf6182921a87c68d96.png';
    let newPathThirdImage = './img/banner-2.9b3f155545f266760333.png';

    if (window.innerWidth >= 640) {
      newPathFirstImage = './img/face-banner.svg';
      setCurrentImagePath([
        newPathFirstImage,
        newPathSecondImage,
        newPathThirdImage,
      ]);
    }

    if (window.innerWidth <= 640) {
      newPathFirstImage = './img/Banner-mobile.5ab4e0f94787219dc791.png';
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

  return (
    <div id="#" className={welcomeStyles.header}>
      <HeaderLogoMenu />

      <h1 className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </h1>

      <div className={welcomeStyles.header__wrapper}>
        <div className="navigation-button-prev-1">
          <div
            className={`${navigationStyle['navigation-button']} ${navigationStyle['navigation-button--left']}`}
          >
            <img src="./img/chevron-arrow_left.svg" alt="img" />
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
            nextEl: '.navigation-button-next-1',
            prevEl: '.navigation-button-prev-1',
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
                src={`${currentImagePath[1]}`}
                className={`${welcomeStyles['header__swiper-0']} ${welcomeStyles.header__swiper}`}
              />
            </Link>
          </SwiperSlide>
        </Swiper>

        <div className="navigation-button-next-1">
          <div
            className={`${navigationStyle['navigation-button']} ${navigationStyle['navigation-button--right']}`}
          >
            <img src="./img/chevron-arrow-right.svg" alt="arrow rigth" />
          </div>
        </div>
      </div>

      <div className={paginationStyle.pagination}></div>

      {isMenuOpen && <Sidebar />}
    </div>
  );
};

export default WelcomeSlider;
