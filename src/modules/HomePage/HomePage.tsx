import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.module.scss';
import { ProductCard } from '../../components/ProductList/ProductCard';
import { Product } from '../../components/types/Product';
import { getProducts } from '../../components/api/products';
import styles from './HomePage.module.scss';
import { useRef } from 'react';
import { getCarouselStep } from '../../utils/carouselHelpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { getItemId } from '../../utils/getItemId';

import 'swiper/css';
import 'swiper/css/navigation';


const images: string[] = [
  "./img/Banner.png",
  "./img/banner-phones.png",
  "./img/banner-tablets.png",
  "./img/banner-accessories.png",
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();

  const brandPrevRef = useRef<HTMLButtonElement | null>(null);
  const brandNextRef = useRef<HTMLButtonElement | null>(null);

  const hotPrevRef = useRef<HTMLButtonElement | null>(null);
  const hotNextRef = useRef<HTMLButtonElement | null>(null);


  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImages = isMobile
    ? ['./img/BannerMobile.png', images[1], images[2], images[3]]
    : images;

  const brandNewNoDiscount = products
    .filter(product => product.year >= 2022)
    .slice(0, 8);

  const hotPrices = products
    .filter(product => {
      const regular = product.priceRegular || product.fullPrice || 0;
      const discount = product.priceDiscount || product.price || 0;
      return regular - discount > 50;
    })
    .slice(0, 8);

  const nextBanner = () =>
    setCurrentBannerIndex(prev => (prev + 1) % images.length);

  const prevBanner = () =>
    setCurrentBannerIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <main className={styles.home}>
      <div className={styles.container}>
        <h1 className={`${styles.home__title} h1`}>
          Welcome to Nice Gadgets store!
        </h1>

        {/* 1. БАНЕР */}
        <section className={styles.slider}>
          <button className={styles.slider__arrow} onClick={prevBanner}>
            {'<'}
          </button>
          <div className={styles.slider__window}>
            <img
              src={currentImages[currentBannerIndex]}
              alt="Banner"
              className={styles.banner_image}
            />
          </div>
          <button className={styles.slider__arrow} onClick={nextBanner}>
            {'>'}
          </button>
        </section>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === currentBannerIndex ? styles.dot_active : ''}`}
              onClick={() => setCurrentBannerIndex(index)}
            />
          ))}
        </div>

        {/* 2. BRAND NEW MODELS */}
        <section className={styles.section}>
          <div className={styles.section__header}>
            <h2 className={`${styles.section__title} h2`}>Brand new models</h2>

            <div className={styles.arrows}>
              <button ref={brandPrevRef} className={styles.arrow_btn}>
                {'<'}
              </button>
              <button ref={brandNextRef} className={styles.arrow_btn}>
                {'>'}
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.3 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            onBeforeInit={swiper => {
              // @ts-ignore
              swiper.params.navigation.prevEl = brandPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = brandNextRef.current;
            }}
            navigation={{
              prevEl: brandPrevRef.current,
              nextEl: brandNextRef.current,
            }}
          >
            {brandNewNoDiscount.map(product => (
              <SwiperSlide key={product.itemId}>
                <div
                  onClick={e => {
                    const target = e.target as HTMLElement;

                    if (target.closest('button')) {
                      return;
                    }

                    navigate(`/${product.category}/${getItemId(product)}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ProductCard
                    product={product}
                    className={styles.card_home_custom}
                    hideDiscount
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 3. CATEGORIES */}
        <section className={styles.categories}>
          <div className={styles.categories__content}>
            <h2 className={`${styles.categories__title} h2`}>
              Shop by category
            </h2>
            <div className={styles.categories__list}>
              <Link to="/phones" className={styles.category}>
                <div className={styles.category__image_phones}>
                  <img src="./img/phones/Phones.png" alt="Phones" />
                </div>
                <h4 className={styles.category__name}>Mobile phones</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'phones').length} models
                </p>
              </Link>
              <Link to="/tablets" className={styles.category}>
                <div className={styles.category__image_tablets}>
                  <img src="./img/tablets/Tablets.png" alt="Tablets" />
                </div>
                <h4 className={styles.category__name}>Tablets</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'tablets').length} models
                </p>
              </Link>
              <Link to="/accessories" className={styles.category}>
                <div className={styles.category__image_accessories}>
                  <img
                    src="./img/accessories/Accessories.png"
                    alt="Accessories"
                  />
                </div>
                <h4 className={styles.category__name}>Accessories</h4>
                <p className={styles.category__count}>
                  {products.filter(p => p.category === 'accessories').length}{' '}
                  models
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. HOT PRICES */}
        <section className={styles.section}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Hot prices</h2>
            <div className={styles.arrows}>
              <button ref={hotPrevRef} className={styles.arrow_btn}>
                {'<'}
              </button>

              <button ref={hotNextRef} className={styles.arrow_btn}>
                {'>'}
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1.3 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            onBeforeInit={swiper => {
              // @ts-ignore
              swiper.params.navigation.prevEl = hotPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = hotNextRef.current;
            }}
            navigation={{
              prevEl: hotPrevRef.current,
              nextEl: hotNextRef.current,
            }}
          >
            {hotPrices.map(product => (
              <SwiperSlide key={product.itemId}>
                <div
                  onClick={e => {
                    const target = e.target as HTMLElement;

                    if (target.closest('button')) {
                      return;
                    }

                    navigate(`/${product.category}/${getItemId(product)}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ProductCard
                    product={product}
                    className={styles.card_home_custom}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </main>
  );
};
