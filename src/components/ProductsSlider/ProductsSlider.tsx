import { useState } from 'react';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../ProductCard/ProductCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  title: string;
  products: Product[];
  showDiscount: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}: Props) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  if (!products.length) {
    return null;
  }

  return (
    <section className={styles.slider}>
      <div className={styles.slider__top}>
        <h2 className={styles.slider__title}>{title}</h2>

        <div className={styles.slider__buttons}>
          <button
            ref={setPrevEl}
            className={`${styles.slider__button} ${styles['slider__button--left']}`}
          />
          <button
            ref={setNextEl}
            className={`${styles.slider__button} ${styles['slider__button--right']}`}
          />
        </div>
      </div>

      <div className={styles.slider__content}>
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
                className={styles.slider__content__slider}
              >
                <ProductCard product={p} showDiscount={showDiscount} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
