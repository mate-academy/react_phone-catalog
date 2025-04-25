import React from 'react';
import style from './Slider.module.scss';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line max-len
import mobileSlide1 from '../../../../shared/assets/sliderImage/mobileSide1.png';
// eslint-disable-next-line max-len
import mobileSlide2 from '../../../../shared/assets/sliderImage/mobileSlide2.webp';
// eslint-disable-next-line max-len
import mobileSlide3 from '../../../../shared/assets/sliderImage/mobileSlide3.webp';
// eslint-disable-next-line max-len
import tabletSlide1 from '../../../../shared/assets/sliderImage/sliderTablet1.png';
// eslint-disable-next-line max-len
import tabletSlide2 from '../../../../shared/assets/sliderImage/sliderTablet2.webp';
// eslint-disable-next-line max-len
import tabletSlide3 from '../../../../shared/assets/sliderImage/sliderTablet3.png';
import arrowLeft from '../../../../shared/assets/icons/chevron-arrow-left.svg';
// eslint-disable-next-line max-len
import arrowRight from '../../../../shared/assets/icons/chevron-arrow-right.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useMediaQuery } from '@uidotdev/usehooks';

export const Slider: React.FC = () => {
  const isTabletMatch = useMediaQuery('(min-width: 640px)');

  const slideArr = isTabletMatch
    ? [tabletSlide1, tabletSlide2, tabletSlide3]
    : [mobileSlide1, mobileSlide2, mobileSlide3];

  return (
    <div className={style.sliderContent}>
      <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>
      <div className={style.slider}>
        <div className={style.sliderContainer}>
          <div id="swiper-button-prev" className={style.navigationPrev}>
            <img src={arrowLeft} alt="arrow left" className={style.active} />
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            // spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: `#swiper-button-next`,
              prevEl: `#swiper-button-prev`,
            }}
            pagination={{
              el: '#swiper-pagination',
              clickable: true,
              bulletClass: `${style.paginationBullet}`,
              bulletActiveClass: `${style.paginationBulletActive}`,
            }}
            // eslint-disable-next-line no-console
            onSwiper={swiper => console.log(swiper)}
            // eslint-disable-next-line no-console
            onSlideChange={() => console.log('slide change')}
          >
            <div className={style.slideContent}>
              <SwiperSlide>
                <div className={style.slideImg}>
                  <img
                    src={slideArr[0]}
                    alt="slide 1"
                    className={style.slide}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img
                    src={slideArr[1]}
                    alt="slide 2"
                    className={style.slide}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img
                    src={slideArr[2]}
                    alt="slide 3"
                    className={style.slide}
                  />
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
          <div id="swiper-button-next" className={style.navigationNext}>
            <img src={arrowRight} alt="arrow right" className={style.active} />
          </div>
        </div>
        <div id="swiper-pagination" className={style.pagination}></div>
      </div>
    </div>
  );
};
