/* eslint-disable @typescript-eslint/no-explicit-any */
//#region imports
import styles from './CardGalery.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
//#endregion

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 640);

  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth >= 640);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTablet;
}

export function CardGalery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const isTablet = useIsTablet();

  return (
    <div className={styles.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className={styles.mainWrapper}>
            <img src={img} alt={`Photo ${i + 1}`} className={styles.mainImg} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        key={isTablet ? 'vertical' : 'horizontal'}
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbsSwiper}
        direction={isTablet ? 'vertical' : 'horizontal'}
        slidesPerView={5}
        spaceBetween={8}
        freeMode={true}
        watchSlidesProgress={true}
        className={styles.thumbsSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className={styles.thumbSlide}>
            <img src={img} alt={`Thumb ${i + 1}`} className={styles.thumbImg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
