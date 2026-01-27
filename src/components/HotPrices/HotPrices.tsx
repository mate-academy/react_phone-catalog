import styles from './HotPrices.module.scss';
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

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    getProducts().then(data => {
      const topDiscount = data
        .sort((a, b) => {
          const discountA = a.fullPrice - a.price;
          const discountB = b.fullPrice - b.price;

          return discountB - discountA;
        })
        .slice(0, 20);

      setProducts(topDiscount);
    });
  }, []);

  return (
    <section className={styles.hotPrices}>
      <div className={styles.hotPrices__top}>
        <div className={styles.hotPrices__title}>Hot prices</div>
        <div className={styles.hotPrices__buttons}>
          <button
            ref={setPrevEl}
            className={`${styles.hotPrices__button} ${styles['hotPrices__button--left']}`}
            aria-label="Previous slide"
          />
          <button
            ref={setNextEl}
            className={`${styles.hotPrices__button} ${styles['hotPrices__button--right']}`}
            aria-label="Next slide"
          />
        </div>
      </div>

      <div className={styles.hotPrices__content}>
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
                className={styles.hotPrices__content__slider}
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
