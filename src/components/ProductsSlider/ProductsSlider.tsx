import React from 'react';
import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  title: string;
  navigationPrevClass: string;
  navigationNextClass: string;
  showFullPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  navigationPrevClass,
  navigationNextClass,
  showFullPrice,
}) => {
  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button className={`${styles.arrow} ${navigationPrevClass}`}>
            <img src="./img/icons/arrow-left.svg" alt="Previous" />
          </button>
          <button className={`${styles.arrow} ${navigationNextClass}`}>
            <img src="./img/icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${navigationPrevClass}`,
          nextEl: `.${navigationNextClass}`,
        }}
        spaceBetween={16}
        slidesPerView={'auto'}
        className={styles.swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} showFullPrice={showFullPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
