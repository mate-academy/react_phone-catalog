// YouMayAlsoLike.tsx
import styles from './YouMayAlsoLike.module.scss';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../../../components/ProductCard';
import type { Product } from '../../../../types/Product';
import { PrevButton } from '../../../../components/PrevButton';
import { NextButton } from '../../../../components/NextButton/NextButton';

interface YouMayAlsoLikeProps {
  likeProducts: Product[];
}

export const YouMayAlsoLike = ({ likeProducts }: YouMayAlsoLikeProps) => {
  return (
    <section className={styles.youMayAlsoLikeProps}>
      <div className="like__container">
        <div className={styles.body}>
          <div className={styles.sliderControls}>
            <h2 className="section-title-h2">You may also like</h2>
            <div className={styles.blockArrows}>
              {/* Кнопка НАЗАД */}
              <PrevButton className="like-prev" />
              {/* Кнопка ВПЕРЕД */}
              <NextButton className="like-next" />
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
              prevEl: '.like-prev',
              nextEl: '.like-next',
            }}
            className={styles.swiperContainer}
          >
            {likeProducts.map(product => (
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
