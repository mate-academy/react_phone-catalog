import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import React from 'react';
import { Product } from '../../modules/shared/types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};
export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount = false,
}) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const prevClass = `js-swiper-prev-${slug}`;
  const nextClass = `js-swiper-next-${slug}`;

  return (
    <div className={styles.section}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>{title}</h2>
        <div className={styles.navigationButtons}>
          <button className={`${styles.navButton} ${prevClass}`}>
            <img src="img/icons/arrow-left.png" alt="Swiper Left" />
          </button>
          <button className={`${styles.navButton} ${nextClass}`}>
            <img src="img/icons/arrow-right.png" alt="Swiper Right" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        spaceBetween={16}
        slidesPerView="auto"
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
