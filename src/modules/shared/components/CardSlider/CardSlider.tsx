import { useState } from 'react';
import type React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { asset } from '../../../../helper';
import type { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './CardSlider.module.scss';

type Props = {
  products: Product[];
  title?: string;
};

export const CardSlider: React.FC<Props> = ({ products, title }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (instance: SwiperType) => {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.controls}>
          <button
            type="button"
            className={classNames(styles.arrow, styles['arrow-prev'])}
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <img src={asset('img/arrow-primary.svg')} alt="" />
          </button>
          <button
            type="button"
            className={classNames(styles.arrow, styles['arrow-next'])}
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <img src={asset('img/arrow-primary.svg')} alt="" />
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.4}
        breakpoints={{
          600: { slidesPerView: 2.4 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={false}
        className={styles['card-slider']}
        onSwiper={instance => {
          setSwiper(instance);
          syncEdges(instance);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div className={styles['slide-content']}>
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
