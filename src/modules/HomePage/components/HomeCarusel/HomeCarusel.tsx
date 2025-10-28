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
import style from './HomeSwiper.module.scss';

const photo = [banner1, banner2, banner3];

export const HomeCarusel = () => {
  return (
    <>
      <div className={style['main-swiper']}>
        <div className={style['main-container']}>
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: `.${style.arrow__next}`,
              prevEl: `.${style.arrow__prev}`,
              disabledClass: 'swiper-button-disabled',
            }}
            grabCursor
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                  <picture className={style.img__picture}>
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
                      className={style['img__slider-p']}
                      src={banner1_dekstop}
                      alt="photo-banner"
                    />
                  </picture>
                ) : (
                  <img className={style.img__slider} src={s} alt={`${i}`} />
                )}
              </SwiperSlide>
            ))}

            <div className={style.arrow__next}>
              <span className={style.arrow__right}></span>
            </div>
            <div className={style.arrow__prev}>
              <span className={style.arrow__left}></span>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};
