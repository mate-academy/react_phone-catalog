import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { getProducts } from '../../services/api';
import { Category, Product } from '../../types/catalog';
import {
  categoryLabels,
  categoryRouteList,
  getPublicAssetPath,
} from '../../utils/category';
import styles from './HomePage.module.scss';

const heroSlides = [
  {
    id: 'phones',
    titleTop: 'Now available',
    titleBottom: 'in our store!',
    subtitle: 'Be the first!',
    label: 'iPhone 14 Pro',
    description: 'Pro. Beyond.',
    image: getPublicAssetPath('/img/banner-phones.png'),
    to: '/phones',
  },
  {
    id: 'tablets',
    titleTop: 'Powerful tablets',
    titleBottom: 'for work and fun',
    subtitle: 'For work, play, and everything in between.',
    label: 'iPad lineup',
    description: 'Big ideas. Bigger screens.',
    image: getPublicAssetPath('/img/banner-tablets.png'),
    to: '/tablets',
  },
  {
    id: 'accessories',
    titleTop: 'Accessories',
    titleBottom: 'for every device',
    subtitle: 'Complete your setup with the right details.',
    label: 'Must-have extras',
    description: 'Cases, audio, chargers, and more.',
    image: getPublicAssetPath('/img/banner-accessories.png'),
    to: '/accessories',
  },
];

const categoryImages: Record<Category, string> = {
  phones: getPublicAssetPath('/img/category-phones.png'),
  tablets: getPublicAssetPath('/img/category-tablets.png'),
  accessories: getPublicAssetPath('/img/category-accessories.png'),
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide(current =>
        current === heroSlides.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong while loading the homepage.</p>;
  }

  const hotPrices = [...products]
    .sort(
      (first, second) =>
        second.fullPrice - second.price - (first.fullPrice - first.price),
    )
    .slice(0, 8);

  const brandNew = [...products]
    .sort((first, second) => second.year - first.year)
    .slice(0, 8);

  const currentHeroSlide = heroSlides[currentSlide];

  const categoryCounts = {
    phones: products.filter(product => product.category === 'phones').length,
    tablets: products.filter(product => product.category === 'tablets').length,
    accessories: products.filter(product => product.category === 'accessories')
      .length,
  } satisfies Record<Category, number>;

  return (
    <section className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <section className={styles.hero}>
        <button
          type="button"
          className={styles.heroArrow}
          aria-label="Previous slide"
          onClick={() =>
            setCurrentSlide(current =>
              current === 0 ? heroSlides.length - 1 : current - 1,
            )
          }
        >
          ‹
        </button>

        <div className={styles.heroBanner}>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <p className={styles.heroText}>
                <span className={styles.heroAccent}>{currentHeroSlide.titleTop}</span>
                <span className={styles.heroTextLine}>{currentHeroSlide.titleBottom}</span>
              </p>
              <p className={styles.heroSubtitle}>{currentHeroSlide.subtitle}</p>
            </div>

            <Link to={currentHeroSlide.to} className={styles.heroButton}>
              Order now
            </Link>
          </div>

          <div className={styles.heroProduct}>
            <div className={styles.heroProductInfo}>
              <span className={styles.heroLabel}>{currentHeroSlide.label}</span>
              <span className={styles.heroDescription}>
                {currentHeroSlide.description}
              </span>
            </div>

            <img
              src={currentHeroSlide.image}
              alt={currentHeroSlide.label}
              className={styles.heroImage}
            />
          </div>
        </div>

        <button
          type="button"
          className={styles.heroArrow}
          aria-label="Next slide"
          onClick={() =>
            setCurrentSlide(current =>
              current === heroSlides.length - 1 ? 0 : current + 1,
            )
          }
        >
          ›
        </button>
      </section>

      <div className={styles.heroDots}>
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            className={`${styles.heroDot} ${index === currentSlide ? styles.heroDotActive : ''}`.trim()}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
        </div>
        <div id="brand-new">
          <ProductList products={brandNew.slice(0, 4)} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>
        <div className={styles.categories}>
          {categoryRouteList.map(category => (
            <Link
              key={category}
              to={`/${category}`}
              className={styles.categoryCard}
            >
              <div
                className={styles.categoryImage}
                style={{
                  backgroundImage: `url(${categoryImages[category]})`,
                }}
              />

              <h3 className={styles.categoryTitle}>
                {categoryLabels[category]}
              </h3>
              <p className={styles.categoryCount}>
                {categoryCounts[category]} models
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
        </div>
        <ProductList products={hotPrices.slice(0, 4)} />
      </section>
    </section>
  );
};
