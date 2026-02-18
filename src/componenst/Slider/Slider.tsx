import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Slider.module.scss';

type Slide = {
  id?: string;
  image: string;
  link?: string;
};

interface SliderProps {
  slides: Slide[];
}

const base = import.meta.env.BASE_URL ?? '/';
const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

const Slider: React.FC<SliderProps> = ({ slides }) => (
  <div className={styles.wrapper}>
    {/* prev/next buttons rendered outside the swiper */}
    <button className={`${styles.navBtn} ${styles.prev} swiper-btn-prev`}>
      <img src={resolveUrl('icons/left.svg')} alt="Previous" />
    </button>
    <button className={`${styles.navBtn} ${styles.next} swiper-btn-next`}>
      <img src={resolveUrl('icons/right.svg')} alt="Next" />
    </button>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
      pagination={{ clickable: true, el: '.swiper-dots' }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className={styles.swiper}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={slide.id ?? i}>
          <a href={slide.link ?? '#'} className={styles.slide}>
            <img
              src={resolveUrl(slide.image)}
              alt=""
              className={styles.image}
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* pagination dots rendered outside the swiper */}
    <div className="swiper-dots" />
  </div>
);

export default Slider;
