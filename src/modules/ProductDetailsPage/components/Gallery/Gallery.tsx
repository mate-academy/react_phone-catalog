import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import styles from './Gallery.module.scss';
import 'swiper/css';
import 'swiper/css/thumbs';

interface Props {
  images: string[];
}

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView="auto"
          spaceBetween={8}
          breakpoints={{
            800: {
              direction: 'vertical',
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          className={styles.thumbsSwiper}
        >
          {images.map(image => (
            <SwiperSlide key={image} className={styles.thumbSlide}>
              <img src={image} alt="Thumbnail" className={styles.thumbImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.mainImage}>
        <Swiper
          modules={[Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className={styles.mainSwiper}
        >
          {images.map(image => (
            <SwiperSlide key={image}>
              <img src={image} alt="Main product" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
