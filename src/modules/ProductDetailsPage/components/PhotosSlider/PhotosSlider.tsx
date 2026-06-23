import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/thumbs';
import { FC, useState, useEffect } from 'react';
import styles from './PhotosSlider.module.scss';
import type { Swiper as SwiperType } from 'swiper';

type Props = {
  images: string[];
};

function useSwiperDirection() {
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    window.innerWidth >= 640 ? 'vertical' : 'horizontal',
  );

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth >= 640 ? 'vertical' : 'horizontal');
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return direction;
}

export const PhotosSlider: FC<Props> = ({ images }) => {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const thumbsDirection = useSwiperDirection();

  return (
    <div className={styles.PhotosGallery}>
      <Swiper
        modules={[Thumbs]}
        slidesPerView={1}
        thumbs={{ swiper: thumbs }}
        className={styles.mainSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={`product image ${index}`}
              className={styles.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbs}
        spaceBetween={10}
        slidesPerView="auto"
        centerInsufficientSlides
        watchSlidesProgress
        direction={thumbsDirection}
        modules={[Thumbs]}
        className={styles.thumbs}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image}
            className={`thumbSlide ${styles.thumbSlide}`}
          >
            <img
              src={image}
              alt={`thumb ${index}`}
              className={styles.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
