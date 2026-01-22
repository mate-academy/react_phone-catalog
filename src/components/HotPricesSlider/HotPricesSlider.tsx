import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './HotPricesSlider.scss';
import styles from './HotPricesSlider.module.scss';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';

export const HotPricesSlider = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then((phonesData: Phone[]) => {
        const sortedPhones = phonesData
          .map(phone => {
            const discount =
              phone.priceDiscount && phone.priceDiscount > 0
                ? phone.priceRegular - phone.priceDiscount
                : 0;

            return { ...phone, discount };
          })
          .sort((a, b) => b.discount - a.discount)
          .filter(phone => phone.discount > 0)
          .map(({ discount, ...phone }) => phone);

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

  if (phones.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.section} HotPricesSlider`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Hot prices</h2>
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
