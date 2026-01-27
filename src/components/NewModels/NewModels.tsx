import styles from './NewModels.module.scss';
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

export const NewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    getProducts().then(data => {
      const top20 = data
        .sort((a, b) => b.year - a.year)
        .slice(0, 20)
        .sort((a, b) => b.price - a.price);

      setProducts(top20);
    });
  }, []);

  return (
    <div className={styles.newModels}>
      <div className={styles.newModels__top}>
        <div className={styles.newModels__title}>Brand new models</div>
        <div className={styles.newModels__buttons}>
          <button
            ref={setPrevEl}
            className={`${styles.newModels__button} ${styles['newModels__button--left']}`}
            aria-label="Previous slide"
          />
          <button
            ref={setNextEl}
            className={`${styles.newModels__button} ${styles['newModels__button--right']}`}
            aria-label="Next slide"
          />
        </div>
      </div>

      <div className={styles.newModels__content}>
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
                className={styles.newModels__content__slider}
              >
                <ProductCardDiscount product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
