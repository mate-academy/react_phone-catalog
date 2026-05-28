import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import styles from './ProductSlider.module.scss';
import { Products } from '../../types/Products';
import ProductCard from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: Products[];
  showDiscount: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            ref={setPrevEl}
            className={styles.button}
            aria-label="Previous slide"
          >
            {'<'}
          </button>

          <button
            ref={setNextEl}
            className={styles.button}
            aria-label="Next slide"
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl, nextEl }}
            slidesPerView="auto"
            spaceBetween={16}
            // observer={true}
            // observeParents={true}
            breakpoints={{
              1200: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {products.map(product => (
              <SwiperSlide className={styles.slide} key={product.id}>
                <ProductCard showDiscount={showDiscount} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;
