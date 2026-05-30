import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './SwiperProductDetails.module.scss';

interface SwiperProductDetailsProps {
  images: string[];
}

export const SwiperProductDetails: React.FC<SwiperProductDetailsProps> = ({
  images,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth >= 640);
    };

    checkIsTablet();
    window.addEventListener('resize', checkIsTablet);

    return () => window.removeEventListener('resize', checkIsTablet);
  }, []);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiper2Slide}>
            <img src={image} alt={`Product image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={images.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper}
        direction={isTablet ? 'vertical' : 'horizontal'}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
