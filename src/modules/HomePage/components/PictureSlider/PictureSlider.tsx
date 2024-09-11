import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import styles from './PictureSlider.module.scss';
import { PictureSliderPictureMap } from '../Helpers/PictureSliderMap';
import { SwiperButton } from '../SwiperButton/SwiperButton';
import { useIconSrc } from '../../../../utils/hooks/useIconSrc';

export const PictureSlider: FC = () => {
  const { arrowLeftUrl, arrowRightUrl } = useIconSrc();

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
          nextEl: '.button-next',
          prevEl: '.button-prev',
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

        {PictureSliderPictureMap.map(item => {
          return (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
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
