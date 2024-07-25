import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import styles from './cardsSwiper.module.scss';
import './cardsSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import { Product } from './../../../types/Product';
import { GadgetCard } from '../gadgetCard/GadgetCard';

type Props = {
  title: string;
  gadgets: Product[];
};

export const CardsSwiper: React.FC<Props> = ({ title, gadgets }) => {
  return (
    <div className={styles.cardsSwiper}>
      <div className={styles.cardsSwiper__tittleContainer}>
        <h2 className={styles.cardsSwiper__tittle}>{title}</h2>

        <div className={styles.cardsSwiper__slideButtons}>
          <div
            id="card-slider-arrowLeft"
            className={styles.cardsSwiper__slideButton}
          >
            <img
              className={styles.cardsSwiper__sliderArrow}
              src="/icons/arrow-left-ico.svg"
              alt="arrowLeft"
            />
          </div>

          <div
            id="card-slider-arrowRight"
            className={styles.cardsSwiper__slideButton}
          >
            <img
              className={styles.cardsSwiper__sliderArrow}
              src="/icons/aroow-right-ico.svg"
              alt="arrowRight"
            />
          </div>
        </div>
      </div>
      <Swiper
        modules={[FreeMode, Navigation]}
        navigation={{
          prevEl: '#card-slider-arrowLeft',
          nextEl: '#card-slider-arrowRight',
        }}
        freeMode={true}
        slidesPerView={'auto'}
        spaceBetween={16}
        className={styles.cardsSwiper__swiper}
      >
        {gadgets.map(gadget => (
          <SwiperSlide className={styles.cardsSwiper__slide} key={gadget.id}>
            <GadgetCard gadget={gadget} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
