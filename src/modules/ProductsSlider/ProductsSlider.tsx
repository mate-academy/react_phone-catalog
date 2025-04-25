import React from 'react';
import { Product } from '../../types/product';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  items: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ items, title }) => {
  return (
    <>
      <div className={styles.box}>
        <h2>{title}</h2>
        <div className={styles.buttons}>
          <button className={styles['slider2-prev']}>
            <img src="/img/icons/leftArrowSlider.svg" alt="Prev" />
          </button>
          <button className={styles['slider2-next']}>
            <img src="/img/icons/rightArrowSlider.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.productSlider}>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          navigation={{
            prevEl: '.slider2-prev',
            nextEl: '.slider2-next',
          }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            960: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4 },
          }}
          className={styles.productSlider__swiper}
          loop={true}
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={index}
              className={styles['productSlider__swiper--slide']}
            >
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductsSlider;
