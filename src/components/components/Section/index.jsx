import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Cart } from '../Cart';
import styles from './section.module.scss';
import './swiper/swiper.scss';

export const Section = ({ sort, title }) => {
  const products = useSelector(state => state.products.products);
  const swiperRef = useRef(null);
  const params = {
    pagination: { clickable: true },
    onSwiper: swiper => {
      swiperRef.current = swiper;
    },
    slidesPerView: 'auto',
    spaceBetween: 16,
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const getCurrentYear = new Date().getFullYear();

  const sortedProducts = () => {
    switch (sort) {
      case 'new':
        return products.filter(product => product.year === getCurrentYear);
      case 'bigPrice':
        return products.slice().sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <h2>{title}</h2>
        <div className={styles.arrowContainer}>
          <div className={styles.arrow} onClick={slidePrev}>
            <FaChevronLeft size={12} />
          </div>
          <div className={styles.arrow} onClick={slideNext}>
            <FaChevronRight size={12} />
          </div>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <Swiper {...params} className={styles.products}>
          {sortedProducts().length > 0 ? (
            sortedProducts().map(products => (
              <SwiperSlide key={products.id} className={styles.swiperSlide}>
                <Cart products={products} />
              </SwiperSlide>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};
