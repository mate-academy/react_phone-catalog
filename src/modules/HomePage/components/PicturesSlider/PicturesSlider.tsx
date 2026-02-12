import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import next from '../../../../assets/images/icons/arrow-right.svg';
import prev from '../../../../assets/images/icons/arrow-left.svg';

import 'swiper/css';
import 'swiper/css/pagination';

import s from './PicturesSlider.module.scss';

const images = [
  {
    imageSrc: 'img/banner-iphone-14-pro.png',
    descriptionText: 'Innovation in your hands.',
    emoji: '🌟',
    title: 'iPhone 14 Pro',
    subtitle: 'Designed to impress.',
    buttonText: 'SHOP NOW',
  },
  {
    imageSrc: 'img/category-tablets.webp',
    descriptionText: 'Unleash your creativity today!',
    emoji: '💡',
    title: 'Apple iPad Series',
    subtitle: 'Your ideas, your way.',
    buttonText: 'EXPLORE NOW',
  },
  {
    imageSrc: 'img/category-accessories.webp',
    descriptionText: 'Stay connected. Stay active.',
    emoji: '⌚',
    title: 'Apple Watch Collection',
    subtitle: 'Your ultimate daily companion.',
    buttonText: 'VIEW COLLECTION',
  },
];

export const PicturesSlider: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === 'object'
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className={s.slider}>
      <div className={s.sliderMain}>
        <button
          ref={prevRef}
          className={cn(s.sliderNavButton, s.sliderPrevButton)}
          aria-label="Previous slide"
        >
          <img src={prev} alt="Previous" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1}
          speed={1000}
          onSwiper={setSwiperInstance}
          pagination={{ clickable: true, el: `.${s.sliderPagination}` }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className={s.swiperContainer}
        >
          {images.map((slide, index) => (
            <SwiperSlide key={index} className={s.sliderSlide}>
              <div className={s.sliderLayout}>
                <div className={s.sliderContent}>
                  <p className={s.sliderDescription}>
                    <span className={s.sliderGradientText}>
                      {slide.descriptionText}
                    </span>
                    <span>{slide.emoji}</span>
                  </p>

                  <p className={s.sliderSubtitle}>Be the first!</p>
                  <button className={s.sliderButton} disabled>
                    {slide.buttonText}
                  </button>
                </div>

                <div className={s.sliderImageWrapper}>
                  <p className={s.sliderMobileDescription}>
                    <span className={s.sliderGradientText}>
                      {slide.descriptionText}
                    </span>
                    <span>{slide.emoji}</span>
                  </p>

                  <h2 className={s.sliderTitle}>{slide.title}</h2>
                  <p className={s.sliderImageSubtitle}>{slide.subtitle}</p>
                  <img
                    src={slide.imageSrc}
                    alt={slide.title}
                    className={s.sliderImage}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={nextRef}
          className={cn(s.sliderNavButton, s.sliderNextButton)}
          aria-label="Next slide"
        >
          <img src={next} alt="Next" />
        </button>
      </div>

      <div className={s.sliderPagination}></div>
    </div>
  );
};
