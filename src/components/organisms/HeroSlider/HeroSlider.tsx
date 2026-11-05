import { useRef, useState } from 'react';
import classNames from 'classnames';
import type { Swiper as SwiperType } from 'swiper';
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Pagination,
  Parallax,
} from 'swiper/modules';
import { Swiper as Slider, SwiperSlide } from 'swiper/react';

import { ArrowButton } from '@/components/molecules';

import { Slide } from './Slide';
import type { HeroSliderData } from './HeroSlider.types';

import styles from './HeroSlider.module.scss';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

type Props = {
  data: HeroSliderData;
  className?: string;
};

export const HeroSlider = ({ data, className }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateProgress = (swiper: SwiperType, percentage: number) => {
    const bullets = paginationRef.current?.querySelectorAll<HTMLElement>(
      '.swiper-pagination-bullet',
    );

    if (!bullets) return;

    const progress = Math.max(0, Math.min(1, 1 - percentage));

    bullets.forEach((bullet, index) => {
      bullet.style.setProperty(
        '--progress',
        index === swiper.realIndex ? String(progress) : '0',
      );
    });
  };

  return (
    <section
      className={classNames(
        styles.container,
        className,
        styles[data.slides[currentSlideIndex].colorScheme],
      )}
    >
      <div className={styles.content}>
        <div className={styles.sliderContainer}>
          <Slider
            className={styles.slider}
            modules={[
              EffectFade,
              Autoplay,
              Keyboard,
              A11y,
              Pagination,
              Parallax,
            ]}
            parallax
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={data.slides.length > 1}
            speed={700}
            autoplay={
              data.slides.length > 1 ?
                {
                  delay: 5000,
                  disableOnInteraction: false,
                }
              : false
            }
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            a11y={{ enabled: true }}
            pagination={{
              el: `.${styles.pagination}`,
              clickable: true,
              renderBullet: (_, className) => `
                <span class="${className}">
                  <span class="${styles.paginationFill}"></span>
                </span>
              `,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setCurrentSlideIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setCurrentSlideIndex(swiper.realIndex);
            }}
            onAutoplayTimeLeft={(swiper, _timeLeft, percentage) => {
              updateProgress(swiper, percentage);
            }}
          >
            {data.slides.map(({ id, ...slide }) => (
              <SwiperSlide
                key={id}
                className={classNames(styles.slide)}
              >
                <Slide data={slide} />
              </SwiperSlide>
            ))}
          </Slider>

          <ArrowButton
            direction="left"
            onClick={() => swiperRef.current?.slidePrev()}
            className={classNames(styles.button, styles.buttonLeft)}
            aria-label="Show previous slide"
          />

          <ArrowButton
            direction="right"
            onClick={() => swiperRef.current?.slideNext()}
            className={classNames(styles.button, styles.buttonRight)}
            aria-label="Show next slide"
          />

          <div
            ref={paginationRef}
            className={styles.pagination}
          />
        </div>
      </div>
    </section>
  );
};
