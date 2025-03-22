import 'swiper/scss';
import 'swiper/scss/navigation';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from 'shared/components/layout/ProductCard';
import { Product } from 'shared/types/Product';

import styles from './ProductsSlider.module.scss';

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
  const navigationPrevId = `prev-${title.replace(/\s+/g, '-')}`;
  const navigationNextId = `next-${title.replace(/\s+/g, '-')}`;

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.navButtons}>
          <div id={navigationPrevId} className={styles.sliderButtonPrev}></div>
          <div id={navigationNextId} className={styles.sliderButtonNext}></div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        className={styles.swiper}
        spaceBetween={16}
        slidesPerView={4}
        navigation={{
          prevEl: `#${navigationPrevId}`,
          nextEl: `#${navigationNextId}`,
          disabledClass: styles.lockedButton,
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles.swiperSlide}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
