import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  return (
    <div className={styles.product_slider}>
      <div className={styles.product_buttons_title}>
        <h2 className={styles.product_title}>{title}</h2>

        <div className={styles.product_buttons}>
          <button
            type="button"
            className={`${styles.product_button} ${styles.prev} js-product-prev`}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            type="button"
            className={`${styles.product_button} ${styles.next} js-product-next`}
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>
      </div>
      <div className={styles.swiper_wrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          breakpoints={{
            1200: { slidesPerView: 4 },
            640: { slidesPerView: 2.5 },
            320: { slidesPerView: 1.5 },
          }}
          navigation={{
            prevEl: '.js-product-prev',
            nextEl: '.js-product-next',
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} showDiscount={showDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
