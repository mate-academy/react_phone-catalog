// .. Brand.jsx
import styles from './HotPrices.module.scss';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../../../components/ProductCard';
import type { Product } from '../../../../types/Product';
import { PrevButton } from '../../../../components/PrevButton';
import { NextButton } from '../../../../components/NextButton/NextButton';

interface HotPricesProps {
  hotProducts: Product[];
}

export const HotPrices = ({ hotProducts }: HotPricesProps) => {
  return (
    <section className={styles.hotPrices}>
      <div className="brand__container">
        <div className={styles.body}>
          <div className={styles.sliderControls}>
            <h2 className="section-title-h2">Hot prices</h2>
            <div className={styles.blockArrows}>
              {/* Кнопка НАЗАД */}
              <PrevButton className="hotPrices-prev" />
              {/* Кнопка ВПЕРЕД */}
              <NextButton className="hotPrices-next" />
            </div>
          </div>

          {/* Сам слайдер із картинками */}
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1.25} // 1. Базове значення для мобілок (< 640px)
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
              prevEl: '.hotPrices-prev',
              nextEl: '.hotPrices-next',
            }}
            className={styles.swiperContainer}
          >
            {hotProducts.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
