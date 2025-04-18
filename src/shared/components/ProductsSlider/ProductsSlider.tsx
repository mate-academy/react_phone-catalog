import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { AllProducts } from '../../types/AllProducts/AllProducts';

type Props = {
  title: string;
  products: AllProducts[];
  sliderId: string;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  sliderId,
}) => {
  return (
    <section className={styles.productSlider}>
      <div className={styles.productSlider__container}>
        <h2 className={styles.productSlider__title}>{title}</h2>
        <div className={styles.productSlider__btn}>
          <button
            className={styles.productSlider__leftBtn}
            id={`prev${sliderId}`}
          >
            <img
              loading="lazy"
              className={styles.productSlider__leftBtnImage}
              src="src/assets/icons/slider-icons/left-arrow.svg"
              alt="Попередній продукт"
            />
          </button>
          <button
            className={styles.productSlider__rightBtn}
            id={`next${sliderId}`}
          >
            <img
              loading="lazy"
              className={styles.productSlider__rightBtnImage}
              src="src/assets/icons/slider-icons/right-arrow.svg"
              alt="Наступний продукт"
            />
          </button>
        </div>

        <div className={styles.productSlider__products}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10} // Відстань між слайдами
            breakpoints={{
              320: {
                slidesPerView: 1.5, // При ширині екрану від 640px - 2 слайди
                spaceBetween: 16, // Відстань між слайдами
              },
              640: {
                slidesPerView: 2.5, // При ширині екрану від 640px - 2 слайди
                spaceBetween: 16, // Відстань між слайдами
              },
              1119: {
                slidesPerView: 4, // При ширині екрану від 1024px - 4 слайди
                spaceBetween: 16,
              },
            }}
            navigation={{
              prevEl: `#prev${sliderId}`,
              nextEl: `#next${sliderId}`,
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
