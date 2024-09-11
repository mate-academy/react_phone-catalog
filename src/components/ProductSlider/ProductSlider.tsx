import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import { SwiperButton } from '../SwiperButton/SwiperButton';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import styles from './ProductSlider.module.scss';

type ProductSliderProps = {
  title: string;
  mb?: boolean;
};

export const ProductSlider: FC<ProductSliderProps> = ({ title, mb }) => {
  const { arrowLeftUrl, arrowRightUrl } = useIconSrc();

  return (
    <div className={styles.productContainer}>
      <h2
        className={styles.productTitle}
        style={{ marginBottom: mb ? '24px' : '0' }}
      >
        {title}
      </h2>
      <Swiper
        slidesPerView={'auto'}
        className={styles.productSlider}
        modules={[Navigation, FreeMode]}
        freeMode={true}
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            freeMode: false,
          },
        }}
      >
        <SwiperButton
          direction="prev"
          className={`${styles.productButtonPrev} swiper-button-prev`}
        >
          <img src={arrowLeftUrl} alt="arrowLeft" />
        </SwiperButton>
        <SwiperButton
          direction="next"
          className={`${styles.productButtonNext} swiper-button-next`}
        >
          <img src={arrowRightUrl} alt="arrowRight" />
        </SwiperButton>

        {[
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 33 },
          { id: 43 },
          { id: 53 },
          { id: 63 },
          { id: 73 },
        ].map(item => {
          return (
            <SwiperSlide key={item.id} className={styles.productSlide}>
              <div className="">Side {item.id}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
