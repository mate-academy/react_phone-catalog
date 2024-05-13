import React, { useEffect, useRef, useState } from 'react';
import styles from './banner.module.scss';
import Banner from './Pictures/banner1.jpeg';
import Banner2 from './Pictures/slide1.png';
import Banner3 from './Pictures/banner3.jpeg';
import sliderButton from './Pictures/sliderButton.png';
import sliderButtonDark from './Pictures/sliderButtonDark.png';
import 'swiper/css';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../services/theme';

export const Baner: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);
  const banners = [Banner, Banner2, Banner3];
  const swiperRef = useRef<Swiper | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveSlideIndex(swiperRef.current.realIndex);
    }
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getButtonColor = (index: number, activeIndex: number) => {
    if (index === activeIndex) {
      return theme === Theme.dark ? '#F1F2F9' : '#000';
    } else {
      return theme === Theme.dark ? '#3B3E4A' : '#F1F2F9';
    }
  };

  return (
    <>
      <div className={styles.bannerWraper}>
        <section className={styles.sectionBanner}>
          <button
            className={
              theme === Theme.light
                ? styles.bannerButtons
                : styles.bannerButtonsDark
            }
            onClick={prevSlide}
          >
            <img
              className={styles.sliderArrowLeft}
              src={theme === Theme.light ? sliderButton : sliderButtonDark}
              alt="Previous"
            />
          </button>
          <div className={styles.bannerContent}>
            <ReactSwiper
              className={styles.bannerImgSwiper}
              spaceBetween={10}
              slidesPerView={1}
              speed={800}
              loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className={styles.bannerImg}
                  />
                </SwiperSlide>
              ))}
            </ReactSwiper>
            <svg
              className={styles.bannerDotters}
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="24"
              viewBox="0 0 80 24"
              fill="none"
            >
              {banners.map((_banner, index) => (
                <rect
                  key={index}
                  x={5 + index * 28}
                  y="10"
                  width="14"
                  height="4"
                  fill={getButtonColor(index, activeSlideIndex)}
                  onClick={() => {
                    setActiveSlideIndex(index);
                    swiperRef.current?.slideTo(index);
                  }}
                />
              ))}
            </svg>
          </div>
          <button
            className={
              theme === Theme.light
                ? styles.bannerButtons
                : styles.bannerButtonsDark
            }
            onClick={nextSlide}
          >
            <img
              className={styles.sliderArrowRight}
              src={theme === Theme.light ? sliderButton : sliderButtonDark}
              alt="Next"
            />
          </button>
        </section>
      </div>
    </>
  );
};

export default Baner;
