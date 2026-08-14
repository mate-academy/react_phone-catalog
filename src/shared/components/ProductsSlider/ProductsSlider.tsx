import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../../../shared/components/ProductCard';
import styles from './ProductsSlider.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Product } from '../../types/Product';
// eslint-disable-next-line max-len
import { useHomePageProducts } from '../../../shared/hooks/useHomePageProducts';
// eslint-disable-next-line max-len
import { SkeletonCardLoader } from '../../../shared/components/SkeletonCardLoader';

interface ProductsSliderProps {
  title: string;
  products: Product[];
  sliderId: string;
  hideFullPrice?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  sliderId,
  hideFullPrice,
}: ProductsSliderProps) => {
  const { isLoading } = useHomePageProducts();

  return (
    <section className={styles.productsSection}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={`${styles.navButton} ${sliderId}-prev`}
          >
            <span className={styles.leftArrow} aria-label="Left arrow" />
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${sliderId}-next`}
          >
            <span className={styles.rightArrow} aria-label="Right arrow" />
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${sliderId}-prev`,
            nextEl: `.${sliderId}-next`,
          }}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCardLoader key={i} />
              </SwiperSlide>
            ))}

          {!isLoading &&
            products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  key={product.id}
                  product={product}
                  hideFullPrice={hideFullPrice}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
