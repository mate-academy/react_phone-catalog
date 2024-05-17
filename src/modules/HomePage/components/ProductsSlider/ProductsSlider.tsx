import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from 'modules/shared/components/ProductCard/ProductCard';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { Product } from 'modules/shared/types/Product';
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
        <h1 className={styles.title}>{title}</h1>

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
