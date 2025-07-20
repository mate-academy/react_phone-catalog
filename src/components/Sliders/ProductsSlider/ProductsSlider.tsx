import { type FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Product } from '../../../types/product';
import { ProductCard } from '../../Product/ProductCard';
import { SkeletonCard } from '../../Skeleton';
//@ts-expect-error: Swiper CSS has no TS types
import 'swiper/scss';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  navigationNext?: string;
  navigationPrev?: string;
  discount?: boolean;
  isLoading: boolean;
}

export const ProductsSlider: FC<Props> = ({
  products,
  title,
  navigationNext,
  navigationPrev,
  discount,
  isLoading,
}) => {
  const nextClass = navigationNext || 'products-slider-next';
  const prevClass = navigationPrev || 'products-slider-prev';

  if (isLoading) {
    const skeletonCount = 4;

    return (
      <div className={styles.skeletonWrapper}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div
            key={index}
            className={styles.card}
          >
            <SkeletonCard width={styles.width} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.controls}>
          <button className={`${styles.arrow} ${prevClass}`}>
            <img
              src={`/icons/arrow_left_active.svg`}
              alt="Previous"
              className="app-icon"
            />
          </button>
          <button className={`${styles.arrow} ${nextClass}`}>
            <img
              src={`/icons/arrow_right_active.svg`}
              alt="Next"
              className="app-icon"
            />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        spaceBetween={16}
        slidesPerView={4}
      >
        {products.length ?
          products.map((product) => (
            <SwiperSlide
              key={product.id}
              className={styles.slide}
            >
              <ProductCard
                discount={discount}
                product={product}
              />
            </SwiperSlide>
          ))
        : null}
      </Swiper>
    </section>
  );
};
