import React from 'react';
import style from './PicturesSlider.module.scss';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import mobileSlide1 from '../../../../shared/img/Sldier/mobileSide1.png';
import mobileSlide2 from '../../../../shared/img/Sldier/mobileSlide2.webp';
import mobileSlide3 from '../../../../shared/img/Sldier/mobileSlide3.webp';
import tabletSlide1 from '../../../../shared/img/Sldier/sliderTablet1.png';
import tabletSlide2 from '../../../../shared/img/Sldier/sliderTablet2.webp';
import tabletSlide3 from '../../../../shared/img/Sldier/sliderTablet3.png';
import arrowLeft from '../../../../shared/icons/chevron-arrow-left.svg';
import arrowRight from '../../../../shared/icons/chevron-arrow-right.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useMediaQuery } from '@uidotdev/usehooks';

import { Swiper, SwiperSlide } from 'swiper/react';

export const PicturesSlider: React.FC = () => {
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
            onSwiper={swiper => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            <div className={style.slideContents}>
              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideArr[0]} alt="slide 1" className={style.slide} />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideArr[1]} alt="slide 2" className={style.slide} />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideArr[2]} alt="slide 3" className={style.slide} />
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
