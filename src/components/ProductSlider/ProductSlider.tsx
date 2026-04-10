import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Product } from '../../types/Product';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from '../Icon';

interface Props {
  title: string;
  products: Product[];
  id: string;
  autoplay?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  id,
  autoplay = false,
}) => {
  const prevClass = `prev-${id}`;
  const nextClass = `next-${id}`;

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__arrows}>
          <button className={prevClass}>
            <Icon name="left" />
          </button>
          <button className={nextClass}>
            <Icon name="right" />
          </button>
        </div>
      </div>
      <Swiper
        key={products.length}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.4}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        loop={autoplay}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className={styles.slider__container}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
