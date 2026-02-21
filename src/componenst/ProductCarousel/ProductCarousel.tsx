import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductCarousel.module.scss';

const base = import.meta.env.BASE_URL ?? '/';

const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

interface ProductCarouselProps {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  showDiscount = true,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img
              src={resolveUrl('icons/left.svg')}
              alt=""
              className={styles.icon}
            />
          </button>
          <button
            type="button"
            className={styles.button}
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img
              src={resolveUrl('icons/right.svg')}
              alt=""
              className={styles.icon}
            />
          </button>
        </div>
      </div>

      <div className={styles.swiperTrack}>
        <Swiper
          onSwiper={s => {
            swiperRef.current = s;
          }}
          spaceBetween={0}
          slidesPerView="auto"
          className={styles.swiper}
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;
