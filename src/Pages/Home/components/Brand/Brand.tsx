// .. Brand.jsx
import styles from './Brand.module.scss';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../../../components/ProductCard';
import type { Product } from '../../../../types/Product';
import { PrevButton } from '../../../../components/PrevButton';
import { NextButton } from '../../../../components/NextButton/NextButton';

interface BrandProps {
  newBrandProducts: Product[];
}

export const Brand = ({ newBrandProducts }: BrandProps) => {
  return (
    <section className={styles.brand}>
      <div className="brand__container">
        <div className={styles.body}>
          <div className={styles.sliderControls}>
            <h2 className="section-title-h2">Brand new models</h2>
            <div className={styles.blockArrows}>
              {/* Кнопка НАЗАД */}
              <PrevButton className="brand-prev" />
              {/* Кнопка ВПЕРЕД */}
              <NextButton className="brand-next" />
            </div>
          </div>

          {/* Сам слайдер із картинками */}
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1.25} // 1. Базове значення для мобілок (< 640px)
            observer={true}
            observeParents={true}
            // 2. Адаптив під твої брейкпоінти (640px і 1200px)
            breakpoints={{
              // Коли ширина екрана >= 640px (tablet)
              640: {
                slidesPerView: 2.25,
              },
              // Коли ширина екрана >= 1200px (desktop)
              1200: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: '.brand-prev',
              nextEl: '.brand-next',
            }}
            className={styles.swiperContainer}
          >
            {newBrandProducts.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} hasDiscount={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
