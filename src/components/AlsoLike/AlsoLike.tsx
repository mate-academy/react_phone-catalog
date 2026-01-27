import styles from './AlsoLike.module.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
// eslint-disable-next-line max-len
import { ProductCardDiscount } from '../ProductCardDiscount/ProductCardDiscount';

export const AlsoLike = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    getProducts().then(data => {
      const shuffled = [...data];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const randomProducts = shuffled.slice(0, 10);

      setProducts(randomProducts);
    });
  }, []);

  return (
    <section className={styles.hot__prices}>
      <div className={styles.hot__prices__top}>
        <div className={styles.hot__prices__title}>You may also like</div>
        <div className={styles.hot__prices__buttons}>
          <button
            ref={setPrevEl}
            className={`${styles.hot__prices__button} ${styles['hot__prices__button--left']}`}
            aria-label="Previous slide"
          />
          <button
            ref={setNextEl}
            className={`${styles.hot__prices__button} ${styles['hot__prices__button--right']}`}
            aria-label="Next slide"
          />
        </div>
      </div>

      <div className={styles.hot__prices__content}>
        {products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            grabCursor
            slidesPerView="auto"
            breakpoints={{ 1200: { slidesPerView: 4 } }}
            navigation={{
              prevEl,
              nextEl,
              disabledClass: 'swiper-button-disabled',
            }}
          >
            {products.map(p => (
              <SwiperSlide
                key={p.id}
                className={styles.hot__prices__content__slider}
              >
                <ProductCardDiscount product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
