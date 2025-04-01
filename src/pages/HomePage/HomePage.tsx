import React, { useRef, useEffect } from 'react';
import { ProductSlider } from '../../components/ProductSlider';
import jsonData from '../../../public/api/products.json';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/effect-flip';
import 'swiper/css/navigation';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const filteredItemsNew = jsonData.filter(item => item.year === 2022);

  const filteredDiscount = jsonData.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      if (swiper.isBeginning) {
        swiper.slideTo(swiper.slides.length - 1);
      } else {
        swiper.slidePrev();
      }
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      if (swiper.isEnd) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiper = swiperRef.current.swiper;

        if (swiper.isEnd) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.radio}>
        <h1>Welcome to Nice Gadgets store!</h1>
        <button
          className={styles.prev}
          aria-label="prevEl"
          onClick={handlePrevClick}
        >
          ⟨
        </button>
        <Swiper
          ref={swiperRef}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
          breakpoints={{
            320: { navigation: false },
            640: { navigation: true },
          }}
          pagination={{
            el: `.${styles.pagination}`,
            clickable: true,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          modules={[Navigation, Pagination]}
          className={styles.mySwiper}
        >
          <SwiperSlide>
            <img className={styles.img} src="/img/image16.png" alt="Gadget 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className={styles.img}
              src="/img/picthree.bdd2e0fc.png"
              alt="Gadget 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img className={styles.img} src="/img/image16.png" alt="Gadget 3" />
          </SwiperSlide>
        </Swiper>
        <button
          className={`${styles.next} next`}
          aria-label="nextEl"
          onClick={handleNextClick}
        >
          ⟩
        </button>
        <div className={styles.pagination}></div>
      </section>

      <ProductSlider
        sliderTitle="Brand new models"
        filteredItems={filteredItemsNew}
      />

      <section className={styles.category}>
        <h2>Shop by category</h2>
        <div className={styles.category__block}>
          <NavLink
            className={`${styles.category__block__link} ${styles.phones}`}
            to="/phones"
          >
            <img src="public/img/category-phones.webp" alt="Mobile Phones" />
          </NavLink>
          <div className={styles.category__block__info}>
            <h4 className={styles.name}>Mobile phones</h4>
            <p className={styles.model}>95 models</p>
          </div>
        </div>

        <div className={`${styles.category__block} ${styles.tablets}`}>
          <NavLink
            className={`${styles.category__block__link} ${styles.tablets}`}
            to="/tablets"
          >
            <img src="public/img/category-tablets.png" alt="Tablets" />
          </NavLink>
          <div className={styles.category__block__info}>
            <h4 className={styles.name}>Tablets</h4>
            <p className={styles.model}>24 models</p>
          </div>
        </div>

        <div className={`${styles.category__block} ${styles.accessories}`}>
          <NavLink
            className={`${styles.category__block__link} ${styles.accessories}`}
            to="/accessories"
          >
            <img
              className={styles.img}
              src="public/img/category-accessories.png"
              alt="Accessories"
            />
          </NavLink>
          <div className={styles.category__block__info}>
            <h4 className={styles.name}>Accessories</h4>
            <p className={styles.model}>100 models</p>
          </div>
        </div>
      </section>

      <ProductSlider
        sliderTitle="Hot prices"
        filteredItems={filteredDiscount}
      />
    </div>
  );
};
