import { FC, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import styles from './PictureSlider.module.scss';
import { sliderPictureMap } from '../Helpers/PictureSliderMaps';
import { SwiperButton } from '../../../../components/SwiperButton/SwiperButton';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';
import { sliderPictureMapMobile } from '../Helpers/PictureSliderMaps';
import { Image } from '../../../../types/Image';

export const PictureSlider: FC = () => {
  const { arrowLeftUrl, arrowRightUrl } = useIconSrc();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [images, setImages] = useState<Image[]>(sliderPictureMap);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (innerWidth < 640) {
      setImages(sliderPictureMapMobile);
    } else {
      setImages(sliderPictureMap);
    }
  }, [innerWidth]);

  return (
    <div className={styles.bannerContainer}>
      <Swiper
        className={styles.homeSlider}
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.customBullet}`,
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.customBulletActive}`,
        }}
      >
        <SwiperButton
          direction="prev"
          className={`${styles.swiperButton} swiper-button-prev`}
        >
          <img src={arrowLeftUrl} alt="arrowLeft" />
        </SwiperButton>

        {images.map(item => {
          return (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              {}
              <img src={item.src} alt={item.title} />
            </SwiperSlide>
          );
        })}

        <SwiperButton
          direction="next"
          className={`${styles.swiperButton} swiper-button-next`}
        >
          <img src={arrowRightUrl} alt="arrowRight" />
        </SwiperButton>
      </Swiper>
    </div>
  );
};
