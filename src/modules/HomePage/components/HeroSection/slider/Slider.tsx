import React from 'react';
import style from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/scrollbar';
import slideMobile1 from '../../HeroSection/assets/slider/baner-mobile-slider.png';
import slideMobile2 from '../../HeroSection/assets/slider/DALLE2_2.png';
import slideMobile3 from '../../HeroSection/assets/slider/DALLE2_1.png';
import { useMediaQuery } from '@uidotdev/usehooks';

// import slideTablet1 from '../../HeroSection/assets/slider/banner-slider.png';
import slideTablet2 from '../../HeroSection/assets/slider/iphone-16.jpg';
import slideTablet3 from '../../HeroSection/assets/slider/8ba101b24b97b5ee3a6b3a89f753.png';
import arrowLeft from '../../../../../shared/assets/icons/chevron-arrow-left.svg';
import arrowRight from '../../../../../shared/assets/icons/chevron-arrow-right.svg';

export const Slider: React.FC = () => {
  const isTabletMatch = useMediaQuery('(min-width: 640px)');

  return (
    <div>
      <div className={style.container}>
        <div id="swiper-button-prev" className={style.paginationPrev}>
          <img src={arrowLeft} alt="arrowleft" />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          navigation={{
            nextEl: `#swiper-button-next`,
            prevEl: `#swiper-button-prev`,
          }}
          pagination={{
            clickable: true,
            el: '#swiper-pagination',
            bulletClass: `${style.paginationBullet}`,
            bulletActiveClass: `${style.paginationBulletActive}`,
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          {isTabletMatch ? (
            <>
              <SwiperSlide>
                <div className={style.sliderImg}>
                  <div className={style.firstSlide}>
                    <div className={style.leftSide}>
                      <div className={style.leftSideContent}>
                        <h2 className={style.leftSideTitle}>Now available in our store!</h2>
                        <p className={style.leftSideDescription}>Be the first!</p>
                      </div>
                      <a href="#" className={style.orderNow}>
                        Order Now
                      </a>
                    </div>

                    <div className={style.rightSide}>
                      <img src={slideMobile1} alt="1" className={style.img} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideTablet2} alt="firsslide" className={style.imgs} />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideTablet3} alt="firsslide" className={style.imgs} />
                </div>
              </SwiperSlide>
            </>
          ) : (
            <>
              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideMobile1} alt="firsslide" className={style.imgs} />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideMobile2} alt="firsslide" className={style.imgs} />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={style.slideImg}>
                  <img src={slideMobile3} alt="firsslide" className={style.imgs} />
                </div>
              </SwiperSlide>
            </>
          )}
        </Swiper>

        <div id="swiper-button-next" className={style.paginationNext}>
          <img src={arrowRight} alt="arrowleft" />
        </div>
      </div>
      <div id="swiper-pagination" className={style.pagination}></div>
    </div>
  );
};
