import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './BanerSlider.module.scss';
import { useEffect, useRef, useState } from 'react';
import banner1 from './assets/banner-phones.png';
import banner2 from './assets/big_banner.png';
import mobileBanner1 from './assets/little_banner.png';

export const BanerSlider = () => {
  const [bannerImages, setBannerImages] = useState([banner1, banner2]);
  const swiperRef = useRef<SwiperClass | null>(null);
  const windowWidth = window.innerWidth;

  useEffect(() => {
    if (windowWidth < 600) {
      setBannerImages([mobileBanner1]);
    } else {
      setBannerImages([banner1, banner2]);
    }
  }, [windowWidth]);

  return (
    <>
      <section className={style.baner}>
        <button
          className={style.arrow + ' ' + style['arrow--prev']}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img
            className={style.arrow_image}
            src="/img/Icons/Chevron(Arrow_Left).png"
            alt="previous"
          />
        </button>
        <Swiper
          pagination={{
            clickable: true,
            el: `.${style.customPagination}`,
          }}
          modules={[Pagination]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          onSwiper={swiperInstance => {
            swiperRef.current = swiperInstance;
          }}
          spaceBetween={50}
          slidesPerView={1}
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className={style.baner__img}
                src={image}
                alt={`banner ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={style.arrow + ' ' + style['arrow--next']}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img
            className={style.arrow_image}
            src="/img/Icons/Chevron(Arrow_Right).png"
            alt="next"
          />
        </button>
      </section>
      <div className={style.customPagination}></div>
    </>
  );
};
