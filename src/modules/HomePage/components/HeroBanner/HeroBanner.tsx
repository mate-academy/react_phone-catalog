import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './HeroBanner.module.scss';
import React, { useEffect, useRef } from 'react';
import iconArrowRight from '../../../../assets/icons/arrow-right.svg';
import appleAd1 from '../../../../assets/images/apple-ad-1.jpg';
import appleAd2 from '../../../../assets/images/apple-ad-2.jpg';
import appleAd3 from '../../../../assets/images/apple-ad-3.jpg';

const banners = [{ src: appleAd1 }, { src: appleAd2 }, { src: appleAd3 }];

export const HeroBanner: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const isDesktop = window.innerWidth >= 640;

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      typeof swiperRef.current.params.navigation === 'object'
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;

      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className={styles.banner}>
      <div className="container">
        <h1 className={styles.banner__title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={isDesktop ? 'container' : ''}>
        <div className={styles.sliderWrapper}>
          {/* Left button */}
          <button ref={prevRef} className={`${styles.button} ${styles.prev}`}>
            <img src={iconArrowRight} alt="Previous" />
          </button>

          {/* Swiper */}
          <Swiper
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className={styles.banner__swiper}
          >
            {banners.map((url, index) => (
              <SwiperSlide key={index}>
                <div className={styles.banner__slider}>
                  <img
                    src={url.src}
                    alt="Ad"
                    className={styles.banner__sliderImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right button */}
          <button ref={nextRef} className={`${styles.button} ${styles.next}`}>
            <img src={iconArrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};
