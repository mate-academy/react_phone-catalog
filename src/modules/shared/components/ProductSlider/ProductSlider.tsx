import styles from './ProductSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../../../types/Product';

interface Props {
  title: string;
  products: Product[];
  prevButtonId: string;
  nextButtonId: string;
  isBrandNew?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  prevButtonId,
  nextButtonId,
  isBrandNew = false,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.navigationButtons}>
          <button
            id={prevButtonId}
            className={`${styles.pageButton} ${styles.prev}`}
          >
            <img src="img/arrow-left-pag.svg" alt="Previous" />
          </button>
          <button
            id={nextButtonId}
            className={`${styles.pageButton} ${styles.next}`}
          >
            <img src="img/arrow-right-pag.svg" alt="Previous" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `#${prevButtonId}`,
          nextEl: `#${nextButtonId}`,
        }}
        allowTouchMove={true}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        className={styles.swiper}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductCard product={product} isBrandNew={isBrandNew} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
