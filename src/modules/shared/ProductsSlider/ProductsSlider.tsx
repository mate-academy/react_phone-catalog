import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import styles from './ProductsSlider.module.scss';
import './ProductsSlider.module.scss';
import 'swiper/css';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import { Product } from '../../../types/Product';
import { GadgetCard } from '../gadgetCard/GadgetCard';

type Props = {
  title: string;
  gadgets: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, gadgets }) => {
  return (
    <div className={styles.ProductsSlider}>
      <div className={styles.ProductsSlider__tittleContainer}>
        <h2 className={styles.ProductsSlider__tittle}>{title}</h2>

        <div className={styles.ProductsSlider__slideButtons}>
          <div
            id="card-slider-arrowLeft"
            className={styles.ProductsSlider__slideButton}
          >
            <img
              className={styles.ProductsSlider__sliderArrow}
              src="/icons/arrow-left-ico.svg"
              alt="arrowLeft"
            />
          </div>

          <div
            id="card-slider-arrowRight"
            className={styles.ProductsSlider__slideButton}
          >
            <img
              className={styles.ProductsSlider__sliderArrow}
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
        className={styles.ProductsSlider__swiper}
      >
        {gadgets.map(gadget => (
          <SwiperSlide className={styles.ProductsSlider__slide} key={gadget.id}>
            <GadgetCard gadget={gadget} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
