import React, { useEffect, useState, useMemo, useRef, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import styles from './HomePage.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

const bannerImages = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const brandNewRef = useRef<HTMLDivElement>(null);
  const hotPricesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(
      prev => (prev - 1 + bannerImages.length) % bannerImages.length,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bannerImages.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      handleNextSlide();
    }

    if (distance < -50) {
      handlePrevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
  ) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -288 : 288;

      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const brandNew = useMemo(() => {
    // Отбираем товары без скидки (полная цена равна текущей цене)
    const withoutDiscount = products.filter(
      product => product.fullPrice === product.price,
    );

    // Если товары без скидки найдены — берем их, иначе фоллбек на все товары
    const targetProducts =
      withoutDiscount.length > 0 ? withoutDiscount : products;

    return [...targetProducts]
      .sort((a, b) => (b.year || 0) - (a.year || 0))
      .slice(0, 8);
  }, [products]);

  const hotPrices = useMemo(() => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 8);
  }, [products]);

  const phonesCount = useMemo(
    () => products.filter(p => p.category === 'phones' || !p.category).length,
    [products],
  );
  const tabletsCount = useMemo(
    () => products.filter(p => p.category === 'tablets').length,
    [products],
  );
  const accessoriesCount = useMemo(
    () => products.filter(p => p.category === 'accessories').length,
    [products],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Catalog</h1>

      {/* Hero Banner Section */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <button
            type="button"
            className={styles.bannerNavButton}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 4L6 8L10 12"
                stroke="#313237"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={styles.bannerWindow}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.bannerTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerImages.map((imgSrc, index) => (
                <div key={imgSrc} className={styles.bannerSlide}>
                  <img src={imgSrc} alt={`Banner ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.bannerNavButton}
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="#313237"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {bannerImages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand new models Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
          <div className={styles.sliderButtons}>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={() => handleScroll(brandNewRef, 'left')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="#313237"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={() => handleScroll(brandNewRef, 'right')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="#313237"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.productsList} ref={brandNewRef}>
          {brandNew.map(product => (
            <div key={product.id} className={styles.productCardWrapper}>
              {/* hideDiscount: в этой секции скидка не показывается,
                  даже если товар попал сюда через фоллбек со скидкой */}
              <ProductCard product={product} hideDiscount />
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>
        <div className={styles.categoriesGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={`${getBaseUrl()}img/category-phones.png`}
                alt="Mobile phones"
              />
            </div>
            <h3 className={styles.categoryName}>Mobile phones</h3>
            <span className={styles.categoryCount}>{phonesCount} models</span>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={`${getBaseUrl()}img/category-tablets.png`}
                alt="Tablets"
              />
            </div>
            <h3 className={styles.categoryName}>Tablets</h3>
            <span className={styles.categoryCount}>{tabletsCount} models</span>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={`${getBaseUrl()}img/category-accessories.png`}
                alt="Accessories"
              />
            </div>
            <h3 className={styles.categoryName}>Accessories</h3>
            <span className={styles.categoryCount}>
              {accessoriesCount} models
            </span>
          </Link>
        </div>
      </section>

      {/* Hot prices Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
          <div className={styles.sliderButtons}>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={() => handleScroll(hotPricesRef, 'left')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="#313237"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={() => handleScroll(hotPricesRef, 'right')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="#313237"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Hot prices: скидки показываются как обычно (hideDiscount не передан) */}
        <div className={styles.productsList} ref={hotPricesRef}>
          {hotPrices.map(product => (
            <div key={product.id} className={styles.productCardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
