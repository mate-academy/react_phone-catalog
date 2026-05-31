import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts, sortProducts } from '../../api/products';
import { Product, ProductCategory } from '../../types';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { Loader } from '../../components/Loader';

type CategoryInfoEntry = { title: string; subtitle: string };

const CATEGORY_INFO: Record<ProductCategory, CategoryInfoEntry> = {
  phones: { title: 'Mobile phones', subtitle: '95 models' },
  tablets: { title: 'Tablets', subtitle: '24 models' },
  accessories: { title: 'Accessories', subtitle: '100 models' },
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetchAllProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hotProducts = products
    .slice()
    .sort(
      (a, b) =>
        b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
    )
    .slice(0, 4);

  const newestProducts = sortProducts(products, 'age').slice(0, 4);

  const categoryCards = useMemo(() => {
    return (['phones', 'tablets', 'accessories'] as const).map(category => {
      const categoryProducts = products.filter(
        item => item.category === category,
      );
      const representative = categoryProducts[0]?.images[0] ?? '';

      return {
        category,
        image: representative,
        title: CATEGORY_INFO[category].title,
        subtitle: CATEGORY_INFO[category].subtitle,
      };
    });
  }, [products]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <section className={styles.heroSection}>
        <div className={styles.heroIntro}>
          <p className={styles.heroLabel}>Welcome to Nice Gadgets store!</p>
          <h2 className={styles.heroTitle}>
            Now available in our store! <span>👌</span>
          </h2>
          <p className={styles.heroText}>
            Find the latest gadgets with premium discounts and fast delivery.
          </p>
          <Link to="/phones" className={styles.heroButton}>
            Order now
          </Link>
        </div>
        <PicturesSlider />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>Brand new models</h2>
        </div>
        {isLoading && <Loader />}
        {hasError && (
          <div className={styles.error}>
            Unable to load featured products. Refresh the page.
          </div>
        )}
        {!isLoading && !hasError && (
          <div className={styles.newModelsGrid}>
            {newestProducts.map(product => (
              <div key={product.id} className={styles.newModelCard}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>
                <div>
                  <p className={styles.newProdName}>{product.name}</p>
                  <div className={styles.newProdPrice}>
                    ${product.priceDiscount}
                  </div>
                  <div className={styles.specLine}>
                    <span>Screen</span>
                    <strong>{product.screen}</strong>
                  </div>
                  <div className={styles.specLine}>
                    <span>Capacity</span>
                    <strong>{product.capacity}</strong>
                  </div>
                  <div className={styles.specLine}>
                    <span>RAM</span>
                    <strong>{product.ram}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>Shop by category</h2>
        </div>
        <div className={styles.categoryGrid}>
          {categoryCards.map(card => (
            <Link
              key={card.category}
              to={`/${card.category}`}
              className={styles.categoryCard}
              style={{
                backgroundImage: `linear-gradient(rgba(9, 12, 25, 0.35), rgba(9, 12, 25, 0.35)), url(${card.image})`,
              }}
            >
              <div className={styles.categoryCardContent}>
                <span className={styles.categoryTitle}>{card.title}</span>
                <span className={styles.categorySubtitle}>{card.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {!isLoading && !hasError && (
        <ProductsSlider products={hotProducts} title="Hot prices" />
      )}
    </div>
  );
};
