import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './BrandNewModels.scss';
import styles from './BrandNewModels.module.scss';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';

export const BrandNewModels = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/phones.json').then(res => res.json()),
      fetch('/api/products.json').then(res => res.json()),
    ])
      .then(([phonesData, productsData]) => {
        const productsYearMap = new Map(
          productsData.map((product: { itemId: string; year: number }) => [
            product.itemId,
            product.year,
          ]),
        );

        const sortedPhones = phonesData
          .map((phone: Phone) => ({
            ...phone,
            year: productsYearMap.get(phone.id) || 0,
          }))
          .sort((a: { year: number }, b: { year: number }) => b.year - a.year)
          .map(({ year, ...phone }: Phone & { year: number }) => phone);

        setPhones(sortedPhones.slice(0, 13));
      })
      .catch(() => {
        setPhones([]);
      });
  }, []);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className={`${styles.section} BrandNewModels`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Brand new models</h2>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <img src="/img/arrow_left.svg" alt="Left" />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <img src="/img/arrow_right.svg" alt="Right" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        onSwiper={setSwiperInstance}
        breakpoints={{
          320: {
            slidesPerView: 1.3333,
            spaceBetween: 16,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1000: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        className={styles.swiper}
      >
        {phones.map(phone => (
          <SwiperSlide key={phone.id}>
            <ProductCard phone={phone} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
