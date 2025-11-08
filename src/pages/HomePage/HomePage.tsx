import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 639);

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  const isMobile = useIsMobile();

  const desktopBanners = [
    `${import.meta.env.BASE_URL}img/banner1.png`,
    'https://placehold.co/1040x400/F447AF/fff',
    'https://placehold.co/1040x400/b11ebe/fff',
  ];

  const mobileBanners = [
    `${import.meta.env.BASE_URL}img/banner1-mobile.png`,
    'https://placehold.co/320x320/F447AF/fff',
    'https://placehold.co/320x320/b11ebe/fff',
  ];

  const banners = isMobile ? mobileBanners : desktopBanners;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dataUrl = `${import.meta.env.BASE_URL}api/products.json`;
        const res = await fetch(dataUrl);
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        // console.error('Failed to fetch products for HomePage:', error);
      }
    };

    fetchProducts();
  }, []);

  // Get brand new (phones with highest price first)
  // Otimizado com useMemo para evitar recálculos desnecessários
  const brandNew = useMemo(
    () => products.filter(p => p.category === 'phones').slice(0, 10),
    [products],
  );

  // Get hot prices (products with biggest discount)
  const hotPrices = useMemo(
    () =>
      products
        .filter(p => p.fullPrice > p.price)
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 10),
    [products],
  );

  // Banner navigation functions
  const goToPrevious = () => {
    setCurrentBanner(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentBanner(prev => (prev + 1) % banners.length);
  };

  // Auto-change banner every 5 seconds = 5000
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <h1 className={styles.title}>Product Catalog</h1>

      {/* Banner Slider */}
      <section className={styles.bannerSlider}>
        <div className={styles.bannerContainer}>
          <button className={styles.bannerButton} onClick={goToPrevious}>
            <img
              src={`${import.meta.env.BASE_URL}img/site/arrow-left.svg`}
              alt="Previous"
            />
          </button>

          <img
            src={banners[currentBanner]}
            alt="Banner"
            className={styles.bannerImage}
          />

          <button className={styles.bannerButton} onClick={goToNext}>
            <img
              src={`${import.meta.env.BASE_URL}img/site/arrow-right.svg`}
              alt="Next"
            />
          </button>
        </div>

        <div className={styles.bannerDots}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentBanner ? styles.dotActive : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </section>

      {/* Brand New Models */}
      <ProductSlider title="Brand new models" products={brandNew} />

      {/* Shop by Category */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>

        <div className={styles.categoryGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <img
              src={`${import.meta.env.BASE_URL}img/cat-phones.png`}
              alt="Mobile phones"
            />
            <h3>Mobile phones</h3>
            <p>{products.filter(p => p.category === 'phones').length} models</p>
          </Link>
          <Link to="/tablets" className={styles.categoryCard}>
            <img
              src={`${import.meta.env.BASE_URL}img/cat-tablets.png`}
              alt="Tablets"
            />
            <h3>Tablets</h3>
            <p>
              {products.filter(p => p.category === 'tablets').length} models
            </p>
          </Link>
          <Link to="/accessories" className={styles.categoryCard}>
            <img
              src={`${import.meta.env.BASE_URL}img/cat-accessories.png`}
              alt="Accessories"
            />
            <h3>Accessories</h3>
            <p>
              {products.filter(p => p.category === 'accessories').length} models
            </p>
          </Link>
        </div>
      </section>

      {/* Hot Prices */}
      <ProductSlider title="Hot prices" products={hotPrices} />
    </>
  );
}
