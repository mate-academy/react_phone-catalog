import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './styles.module.scss';



type Props = HTMLAttributes<HTMLDivElement> & { images: string[] };

export const ImageSwiper = ({ images, ...props }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const onResize = () => {
      swiperRef.current?.update();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div {...props}>
      <div className={styles.container}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className={styles.mainSwiper}
          loop
          spaceBetween={10}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs]}
        >
          {images.map((src, index) => (
            <SwiperSlide key={src}>
              <div className={styles.mainSlide}>
                <img
                  className={styles.mainImage}
                  src={src}
                  alt={`Изображение товара ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          className={styles.thumbsSwiper}
          direction="horizontal"
          slidesPerView={5}
          spaceBetween={16}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          resizeObserver={false}
          updateOnWindowResize
          breakpoints={{
            640: {
              direction: 'vertical',
              spaceBetween: 8,
            },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={src} className={styles.thumbSlide}>
              <button
                className={styles.thumbButton}
                type="button"
                aria-label={`Показать изображение ${index + 1}`}
              >
                <img className={styles.thumbImage} src={src} alt="" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
