import styles from './SliderSection.module.scss';
import { ProductType } from '../../types/ProductType';
import { Slider } from '../Slider/Slider';

interface Props {
  products: ProductType[];
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  slidesPerView640?: number | 'auto';
  slidesPerView1024?: number | 'auto';
  prevClass: string;
  nextClass: string;
  title: string;
}

export const SliderSection = ({
  products,
  spaceBetween = 16,
  slidesPerView = 1.5,
  slidesPerView640 = 2.5,
  slidesPerView1024 = 4,
  prevClass,
  nextClass,
  title,
}: Props) => {
  return (
    <>
      <h2 className={styles.slider__title}>{title}</h2>
      <div className={styles.slider__custom_nav}>
        <div className={styles.slider__button_container}>
          <div className={`${prevClass} ${styles.slider__swiper_button_prev}`}>
            &lt;
          </div>
        </div>
        <div className={styles.slider__button_container}>
          <div className={`${nextClass} ${styles.slider__swiper_button_next}`}>
            &gt;
          </div>
        </div>
      </div>
      <div className={styles.slider__slider_container}>
        <Slider
          products={products}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          slidesPerView640={slidesPerView640}
          slidesPerView1024={slidesPerView1024}
          prevClass={prevClass}
          nextClass={nextClass}
        />
      </div>
    </>
  );
};
