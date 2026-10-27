import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { getProducts } from '../../services/products';
import type { Product } from '../../types/Product';
import { imagePath } from '../../utils/imagePath';

import { ProductsSlider } from '../../components/ProductsSlider';

import styles from './HomePage.module.scss';

const categories = [
  { title: 'Mobile phones', path: '/phones', type: 'phones' },
  { title: 'Tablets', path: '/tablets', type: 'tablets' },
  { title: 'Accessories', path: '/accessories', type: 'accessories' },
];

const banners = [
  {
    id: 'phones',
    title: 'Now available in our store! 👌',
    image: 'img/baners/banner-slider.png',
    path: '/phones',
  },
  {
    id: 'tablets',
    title: 'Discover our tablets',
    image: 'img/banner-tablets.png',
    path: '/tablets',
  },
  {
    id: 'accessories',
    title: 'Discover our accessories',
    image: 'img/banner-accessories.png',
    path: '/accessories',
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const hotProducts = useMemo(() => {
    return [...products]
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const newProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  const bannerCount = banners.length;

  useEffect(() => {
    if (bannerCount < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % bannerCount);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [bannerCount]);

  const changeSlide = (direction: number) => {
    if (bannerCount === 0) {
      return;
    }

    setActiveSlide(
      current => (current + direction + bannerCount) % bannerCount,
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className={styles.status}>
        <p>Something went wrong</p>

        <button type="button" onClick={() => setReloadKey(key => key + 1)}>
          Reload
        </button>
      </div>
    );
  }

  const currentBanner = banners[activeSlide] ?? banners[0];

  return (
    <div className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.bannerSection}>
        <h2 className={styles.welcomeTitle}>
          Welcome to Nice
          <br className={styles.welcomeBreak} />
          {' Gadgets store!'}
        </h2>

        <div className={styles.bannerContainer}>
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Previous slide"
            className={styles.bannerArrow}
          >
            &#8249;
          </button>

          {activeSlide === 0 ? (
            <Link
              to="/phones"
              className={`${styles.banner} ${styles.iphoneBanner}`}
              aria-label="Discover iPhone 14 Pro"
            >
              <div className={styles.iphoneBannerDesktop}>
                <div className={styles.iphoneBannerLeft}>
                  <h3>
                    Now available
                    <br />
                    in our store! 👌
                  </h3>

                  <p>Be the first!</p>

                  <span className={styles.iphoneBannerButton}>ORDER NOW</span>
                </div>

                <div className={styles.iphoneBannerRight}>
                  <img
                    className={styles.iphoneBannerPhone}
                    src={imagePath('img/baners/banner-slider-short.png')}
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>

              <img
                className={styles.iphoneBannerMobile}
                src={imagePath(currentBanner.image)}
                alt="iPhone 14 Pro"
              />
            </Link>
          ) : (
            <Link to={currentBanner.path} className={styles.banner}>
              <div className={styles.bannerText}>
                <h3>{currentBanner.title}</h3>
                <span>ORDER NOW</span>
              </div>

              <img
                src={`${import.meta.env.BASE_URL}${currentBanner.image}`}
                alt={currentBanner.title}
              />
            </Link>
          )}

          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Next slide"
            className={styles.bannerArrow}
          >
            &#8250;
          </button>
        </div>

        <div
          className={`${styles.dots}
          ${activeSlide === 0 ? styles.mobileDotsHidden : ''}`}
        >
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              className={index === activeSlide ? styles.activeDot : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
            />
          ))}
        </div>
      </section>

      <ProductsSlider
        title="Brand new models"
        products={newProducts}
        showDiscount={false}
      />

      <section className={styles.section}>
        <h2>Shop by category</h2>

        <div className={styles.categories}>
          {categories.map(category => {
            const categoryProducts = products.filter(
              product => product.category === category.type,
            );

            const preview = categoryProducts[0];

            return (
              <Link
                to={category.path}
                key={category.type}
                className={styles.category}
              >
                <div className={styles.categoryImage}>
                  {preview && (
                    <img src={imagePath(preview.image)} alt={category.title} />
                  )}
                </div>

                <h3>{category.title}</h3>
                <p>{categoryProducts.length} models</p>
              </Link>
            );
          })}
        </div>
      </section>

      <ProductsSlider
        title="Hot prices"
        products={hotProducts}
        showDiscount={true}
      />
    </div>
  );
};
