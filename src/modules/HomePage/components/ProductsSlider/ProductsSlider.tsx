import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { ProductCard } from '../../../shared/components/ProductCard';
import type { Product } from '@/types/Product';
import styles from './ProductsSlider.module.scss';
import iconChevron from '@/assets/icons/icon-chevron.svg';

type SliderType = 'brand-new' | 'hot-prices' | 'you-may-also-like';

type Props = {
  title: string;
  type: SliderType;
};

export const ProductsSlider = ({ title, type }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        if (type === 'brand-new') {
          data.sort((a, b) => b.year - a.year);
          setProducts(data.slice(0, 10));
        }

        if (type === 'hot-prices') {
          data.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
          setProducts(data.slice(0, 10));
        }

        if (type === 'you-may-also-like') {
          setProducts([...data].sort(() => Math.random() - 0.5).slice(0, 10));
        }
      });
  }, [type]);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={`${styles.navBtn} ${styles.navBtnLeft} ${isBeginning ? styles.navBtnDisabled : ''}`}
            onClick={handlePrev}
            aria-label="Previous"
            disabled={isBeginning}
          >
            <img src={iconChevron} alt="" aria-hidden="true" />
          </button>

          <button
            className={`${styles.navBtn} ${isEnd ? styles.navBtnDisabled : ''}`}
            onClick={handleNext}
            aria-label="Next"
            disabled={isEnd}
          >
            <img src={iconChevron} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

      {products.length > 0 && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          breakpoints={{
            1200: { slidesPerView: 4 },
          }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                hideOldPrice={type === 'brand-new'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
