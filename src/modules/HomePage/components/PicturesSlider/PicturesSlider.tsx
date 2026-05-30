import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './PicturesSlider.module.scss';
import '../../../../shared/styles/pagination.scss';
import arrowR from '../../../../../public/img/icons/icon-arrow-right-black.svg';
import arrowL from '../../../../../public/img/icons/icon-arrow-left-black.svg';
import { NavigationOptions } from 'swiper/types';

const images = [
  'img/slider-20.jpg',
  'img/slider-5.jpg',
  'img/banner-tablets.jpg',
];

export const PicturesSlider: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    if (prevRef.current && nextRef.current && paginationRef.current) {
      setSwiperReady(true);
    }

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const indexAttr = target.getAttribute('data-index');

      if (indexAttr && swiperRef.current) {
        const index = parseInt(indexAttr, 10);

        swiperRef.current.slideToLoop(index);
      }
    };

    const container = paginationRef.current;

    if (container) {
      container.addEventListener('click', handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleClick);
      }
    };
  }, [swiperReady]);

  return (
    <div className={styles['main-slider']}>
      <div className={styles['main-slider__container']}>
        <h1 className={styles['main-slider__title']}>
          Welcome to Nice Gadgets store!
        </h1>

        <div className={styles['main-slider__wrapper']}>
          <button ref={prevRef} className={styles['custom-prev']}>
            <img src={arrowL} alt="arrow-left" />
          </button>

          <div className={styles['main-slider__images']}>
            {swiperReady && (
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                loop={true}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                  type: 'custom',
                  renderCustom: (swiper, current, total) => {
                    let dashes = '';

                    for (let i = 1; i <= total; i++) {
                      dashes += `<div data-index="${i - 1}" class="custom-dashes ${
                        i === current ? 'custom-dashes-active' : ''
                      }"></div>`;
                    }

                    return `<div class="custom-pagination">${dashes}</div>`;
                  },
                }}
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                  if (
                    prevRef.current &&
                    nextRef.current &&
                    swiper.params.navigation
                  ) {
                    const nav = swiper.params.navigation as NavigationOptions;

                    nav.prevEl = prevRef.current;
                    nav.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                }}
                style={{ height: '100%', width: '100%' }}
              >
                {images.map(image => (
                  <SwiperSlide key={image}>
                    <div className={styles['main-slider__image']}>
                      <img src={image} alt={`slide`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <button ref={nextRef} className={styles['custom-next']}>
            <img src={arrowR} alt="arrow-right" />
          </button>

          <div
            ref={paginationRef}
            className={styles['main-slider__pagination']}
          />
        </div>
      </div>
    </div>
  );
};
