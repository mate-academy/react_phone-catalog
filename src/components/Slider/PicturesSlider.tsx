import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './PicturesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import classNames from 'classnames';

export const PicturesSlider = () => {
  const sliderImages = [
    {
      desktop: 'img/banner-order.png',
      mobile: 'img/banner-phone.png',
    },
    {
      desktop: 'img/banner-phones.png',
    },
    {
      desktop: 'img/banner-tablets.png',
    },
  ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <section className={styles.picturesSlider}>
      <div className={styles.picturesSlider__inner}>
        <h1 className={styles.picturesSlider__title}>
          Welcome to Nice Gadgets store!
        </h1>

        <div className={styles.picturesSlider__navigation}>
          <button
            ref={prevRef}
            className={classNames(
              styles.picturesSlider__btn,
              styles.picturesSlider__btnPrev,
            )}
          >
            <img src="icons/arrow-slider.svg" alt="Prev arrow button" />
          </button>
        </div>

        <div className={styles.picturesSlider__navigation}>
          <button
            ref={nextRef}
            className={classNames(
              styles.picturesSlider__btn,
              styles.picturesSlider__btnNext,
            )}
          >
            <img src="icons/arrow-slider.svg" alt="Next arrow button" />
          </button>
        </div>

        {init && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className={styles.picturesSlider__box}
            onBeforeInit={swiper => {
              const nav = swiper.params.navigation;

              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }

              const pag = swiper.params.pagination;

              if (pag && typeof pag !== 'boolean') {
                pag.el = paginationRef.current;
                pag.clickable = true;
              }
            }}
          >
            {sliderImages.map((img, index) => (
              <SwiperSlide key={index}>
                <picture>
                  <source srcSet={img.mobile} media="(max-width: 639px)" />
                  <img
                    src={img.desktop}
                    alt={`Slide ${index + 1}`}
                    className={styles.picturesSlider__image}
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div
          ref={paginationRef}
          className={styles.picturesSlider__pagination}
        />
      </div>
    </section>
  );
};
