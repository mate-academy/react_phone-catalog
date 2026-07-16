/* eslint-disable @typescript-eslint/no-explicit-any */
//#region imports
import styles from './HomePage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { BrandCard } from '../../components/BrandCard';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import productsData from '../../../public/api/products.json';
import { Product } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
//#endregion

export function HomePage() {
  const mockmodels = 95;
  const mockmodels2 = 24;
  const mockmodels3 = 105;
  const [newSwiper, setNewSwiper] = useState<any>(null);
  const [hotSwiper, setHotSwiper] = useState<any>(null);
  const [welcomeSwiper, setWelcomeSwiper] = useState<any>(null);
  const navigate = useNavigate();
  //#region Products
  const products = productsData as Product[];
  //#endregion

  return (
    <div className={styles.homepage}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.visually_hidden}>Product Catalog</h1>
        <div className={styles.welcome}>
          <h2 className={styles.welcome__title}>
            Welcome to Nice Gadgets store!
          </h2>

          <div className={styles.welcome__swiper}>
            <button
              className={styles.welcome__swiper__pag}
              onClick={() => welcomeSwiper?.slidePrev()}
            >
              ‹
            </button>
            <Swiper
              modules={[Pagination, Navigation]}
              onSwiper={setWelcomeSwiper}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={1}
              className={styles.welcome__swiper__swiper}
            >
              <SwiperSlide className={styles.welcome__swiper__slide}>
                <Link to="./phones/apple-iphone-14-pro-128gb-spaceblack">
                  <img
                    className={styles.welcome__swiper__swiper__imgTablet}
                    src="./img/Banner.png"
                    alt="Swiper 2"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.welcome__swiper__slide}>
                <Link to="./phones/apple-iphone-14-pro-128gb-spaceblack">
                  <img
                    className={styles.welcome__swiper__swiper__imgTablet}
                    src="./img/Banner.png"
                    alt="Swiper 2"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.welcome__swiper__slide}>
                <Link to="./phones/apple-iphone-14-pro-128gb-spaceblack">
                  <img
                    className={styles.welcome__swiper__swiper__imgTablet}
                    src="./img/Banner.png"
                    alt="Swiper 2"
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
            <button
              className={styles.welcome__swiper__pag}
              onClick={() => welcomeSwiper?.slideNext()}
            >
              ›
            </button>
          </div>
        </div>
        <div className={styles.new}>
          <div className={styles.new__topblock}>
            <h2 className={styles.new__title}>Brand new models</h2>
            <div className={styles.new__divider}>
              <button
                onClick={() => newSwiper?.slidePrev()}
                className={styles.new__btn}
              >
                ‹
              </button>
              <button
                onClick={() => newSwiper?.slideNext()}
                className={styles.new__btn}
              >
                ›
              </button>
            </div>
          </div>
          <div className={styles.new__slider}>
            <Swiper
              modules={[Navigation]}
              onSwiper={setNewSwiper}
              slidesPerView={1.2}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={16}
            >
              {products.slice(0, 8).map(product => (
                <SwiperSlide key={product.id}>
                  <BrandCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.category}>
          <h2 className={styles.category__title}>Shop by category</h2>
          <div className={styles.category__cards}>
            <div className={styles.category__card}>
              <img
                className={styles.category__card__img}
                src="./img/Phones.png"
                alt="Phones"
                onClick={() => navigate('phones')}
              />
              <h2 className={styles.category__card__title}>Phones</h2>
              <p className={styles.category__card__counter}>
                {mockmodels} models
              </p>
            </div>
            <div className={styles.category__card}>
              <img
                onClick={() => navigate('tablets')}
                className={styles.category__card__img}
                src="./img/Tablets.png"
                alt="Tablets"
              />
              <h2 className={styles.category__card__title}>Tablets</h2>
              <p className={styles.category__card__counter}>
                {mockmodels2} models
              </p>
            </div>
            <div className={styles.category__card}>
              <img
                onClick={() => navigate('accessories')}
                className={styles.category__card__img}
                src="./img/Accessories.png"
                alt="Accessories"
              />
              <h2 className={styles.category__card__title}>Accessories</h2>
              <p className={styles.category__card__counter}>
                {mockmodels3} models
              </p>
            </div>
          </div>
        </div>

        <div className={styles.new}>
          <div className={styles.new__topblock}>
            <h2 className={styles.new__title}>Hot prices</h2>
            <div className={styles.new__divider}>
              <button
                onClick={() => hotSwiper?.slidePrev()}
                className={styles.new__btn}
              >
                ‹
              </button>
              <button
                onClick={() => hotSwiper?.slideNext()}
                className={styles.new__btn}
              >
                ›
              </button>
            </div>
          </div>
          <div className={styles.new__slider}>
            <Swiper
              modules={[Navigation]}
              onSwiper={setHotSwiper}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.slice(0, 8).map(product => (
                <SwiperSlide key={product.id}>
                  <BrandCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
