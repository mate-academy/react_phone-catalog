import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import cn from 'classnames';
import styles from './ImageSlider.module.scss';

type Props = {
  images: string[];
  alt: string;
};

export const ImageSlider = ({ images, alt }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnails}>
        {images.map((src, i) => (
          <button
            key={src}
            className={cn(styles.thumb, {
              [styles.thumbActive]: i === activeIndex,
            })}
            onClick={() => handleThumbnailClick(i)}
            aria-label={`${alt} - thumbnail ${i + 1}`}
          >
            <img src={`/${src}`} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.mainImage}>
        <Swiper
          onSwiper={s => {
            swiperRef.current = s;
          }}
          onSlideChange={s => setActiveIndex(s.activeIndex)}
          slidesPerView={1}
          className={styles.swiper}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <img
                src={`/${src}`}
                alt={`${alt} - image ${i + 1}`}
                className={styles.slide}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
