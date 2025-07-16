import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './HeroBanner.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import mobileBanner from '../../../../assets/images/mobile-banner.png';
import desktopBanner from '../../../../assets/images/desktop-banner.png';
import iconArrowRight from '../../../../assets/icons/arrow-right.svg';

const banners = [
  { url: 'phones/apple-iphone-14-pro-256gb-spaceblack' },
  { url: 'phones/apple-iphone-14-128gb-midnight' },
  { url: 'phones/apple-iphone-14-128gb-purple' },
];

export const HeroBanner: React.FC = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 640);

  const swiperRef = useRef<SwiperCore | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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

    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bannerImage = isScreenSmall ? mobileBanner : desktopBanner;

  return (
    <section className={styles.banner}>
      <div className="container">
        <h1 className={styles.banner__title}>Welcome to Nice Gadgets store!</h1>

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
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className={styles.banner__slider}>
                  <img
                    src={bannerImage}
                    alt="Banner"
                    className={styles.banner__sliderImage}
                  />
                  <button className={styles.banner__sliderButton}>
                    Order now
                  </button>
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
