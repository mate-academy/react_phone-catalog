import React, { useEffect, useState, useMemo, useRef, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { Icon } from '../../components/Icon';
import { useProducts } from '../../context/ProductsContext';
import { getAssetUrl } from '../../utils/assets';
import styles from './HomePage.module.scss';

const bannerImages = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const HomePage = () => {
  const { products, isLoading, error, reload } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const brandNewRef = useRef<HTMLDivElement>(null);
  const hotPricesRef = useRef<HTMLDivElement>(null);

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
    const withoutDiscount = products.filter(
      product => product.fullPrice === product.price,
    );

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
    () => products.filter(p => p.category === 'phones').length,
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
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      {isLoading && <p className={styles.status}>Loading products...</p>}
      {error && (
        <div className={styles.status}>
          <p>{error}</p>
          <button type="button" onClick={reload}>
            Try again
          </button>
        </div>
      )}

      <section className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <button
            type="button"
            className={styles.bannerNavButton}
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <Icon name="chevron-left" stroke="#313237" />
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
                  <img src={getAssetUrl(imgSrc)} alt={`Banner ${index + 1}`} />
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
            <Icon name="chevron-right" stroke="#313237" />
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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
          <div className={styles.sliderButtons}>
            <button
              type="button"
              className={styles.sliderBtn}
              aria-label="Scroll brand new models left"
              onClick={() => handleScroll(brandNewRef, 'left')}
            >
              <Icon name="chevron-left" stroke="#313237" />
            </button>
            <button
              type="button"
              className={styles.sliderBtn}
              aria-label="Scroll brand new models right"
              onClick={() => handleScroll(brandNewRef, 'right')}
            >
              <Icon name="chevron-right" stroke="#313237" />
            </button>
          </div>
        </div>

        <div className={styles.productsList} ref={brandNewRef}>
          {brandNew.map(product => (
            <div key={product.id} className={styles.productCardWrapper}>
              <ProductCard product={product} hideDiscount />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>
        <div className={styles.categoriesGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={getAssetUrl('img/category-phones.png')}
                alt="Mobile phones"
              />
            </div>
            <h3 className={styles.categoryName}>Mobile phones</h3>
            <span className={styles.categoryCount}>{phonesCount} models</span>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={getAssetUrl('img/category-tablets.png')}
                alt="Tablets"
              />
            </div>
            <h3 className={styles.categoryName}>Tablets</h3>
            <span className={styles.categoryCount}>{tabletsCount} models</span>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={styles.categoryImageWrapper}>
              <img
                src={getAssetUrl('img/category-accessories.png')}
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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
          <div className={styles.sliderButtons}>
            <button
              type="button"
              className={styles.sliderBtn}
              aria-label="Scroll hot prices left"
              onClick={() => handleScroll(hotPricesRef, 'left')}
            >
              <Icon name="chevron-left" stroke="#313237" />
            </button>
            <button
              type="button"
              className={styles.sliderBtn}
              aria-label="Scroll hot prices right"
              onClick={() => handleScroll(hotPricesRef, 'right')}
            >
              <Icon name="chevron-right" stroke="#313237" />
            </button>
          </div>
        </div>

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
