import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import {
  banner1,
  banner2,
  banner3,
  banner1_tablet_X2,
  banner1_dekstop,
} from '@Images/banner';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import './HomeArrowStyle.scss';
// import './'
// import style from './swiper.module.scss';

import './HomeSwiper.scss';
import './HomeArrowStyle.scss';
import './HomePagination.scss';

const photo = [banner1, banner2, banner3];

export const HomeCarusel = () => {
  return (
    <>
      <div className={'main-swiper'}>
        <div className="main-container">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: '.arrow__next',
              prevEl: '.arrow__prev',
              disabledClass: 'swiper-button-disabled',
            }}
            grabCursor
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 222000, disableOnInteraction: false }}
            slideToClickedSlide
            breakpoints={{
              320: { spaceBetween: 40 },
              650: { spaceBetween: 30 },
              1000: { spaceBetween: 20 },
            }}
          >
            {photo.map((s, i) => (
              <SwiperSlide key={i}>
                {s === banner1 ? (
                  <picture className="img__picture">
                    <source
                      srcSet={banner1}
                      media="(max-width: 639px)"
                      type="image/avif"
                    />
                    <source
                      srcSet={banner1_tablet_X2}
                      media="(max-width: 1024px)"
                      type="image/png"
                    />
                    <img
                      className="img__slider-p"
                      src={banner1_dekstop}
                      alt="photo-banner"
                    />
                  </picture>
                ) : (
                  <img className="img__slider" src={s} alt={`${i}`} />
                )}
              </SwiperSlide>
            ))}

            <div className="arrow__next">
              <span className="arrow__right"></span>
            </div>
            <div className="arrow__prev">
              <span className="arrow__left"></span>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};
