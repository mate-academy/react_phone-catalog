import './SliderPictures.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef } from 'react';

export const SliderPictures: React.FC = () => {
  const bannersImg = [
    'img/banners/banner-1.png',
    'img/banners/banner-2.png',
    'img/banners/banner-3.png',
  ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params.navigation &&
      typeof swiperRef.current.params.navigation !== 'boolean'
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <>
      <section className="banner">
        <div className="banner__wrapper">
          <button
            ref={prevRef}
            className={`banner__button icon banner__button--prev`}
            aria-label="Previous picture"
          ></button>
          <Swiper
            className="banner__container"
            modules={[Navigation, Pagination, Autoplay]}
            onBeforeInit={swiper => {
              swiperRef.current = swiper;
            }}
            pagination={{
              el: '.banner__pagination',
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop={true}
          >
            {bannersImg.map((bannerSrc, index) => (
              <SwiperSlide key={index} className="banner__slider">
                <img
                  src={bannerSrc}
                  alt={`banner-${index}`}
                  className="banner__image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            ref={nextRef}
            className={`banner__button icon banner__button--next`}
            aria-label="Next picture"
          ></button>
        </div>
        <div className="banner__pagination"></div>
      </section>
    </>
  );
};
