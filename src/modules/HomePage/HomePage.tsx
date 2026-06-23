import { useEffect, useState } from 'react';
import { CategoryCard } from '../shared/components/CategoryCard';
import { ErrorState } from '../shared/components/ErrorState';
import { Loader } from '../shared/components/Loader';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { getProducts } from '../shared/services/api';
import { ProductSummary } from '../shared/types/catalog';
import { getDiscountAmount } from '../shared/utils/catalog';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Loader label="Loading catalog highlights..." />
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={styles.container}>
        <ErrorState />
      </section>
    );
  }

  const hotPrices = [...products]
    .sort(
      (first, second) => getDiscountAmount(second) - getDiscountAmount(first),
    )
    .slice(0, 12);

  const brandNew = [...products]
    .sort((first, second) => second.year - first.year)
    .slice(0, 12);

  const phoneCount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletCount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <div className={styles.container}>
      <h1 className="visuallyHidden">Product Catalog</h1>

      <section className={styles.hero}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Curated tech picks</p>
          <h2 className={styles.title}>
            Build your next Apple setup without the guesswork
          </h2>
          <p className={styles.subtitle}>
            Explore discounts, compare categories, and jump into the products
            people are looking at most right now.
          </p>
        </div>

        <PicturesSlider />
      </section>

      <ProductsSlider title="Hot prices" products={hotPrices} />

      <section className={styles.categories}>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
          <p className={styles.sectionText}>
            Pick the aisle that matches what you want to upgrade.
          </p>
        </div>

        <div className={styles.categoryGrid}>
          <CategoryCard
            category="phones"
            image="/img/category-phones.webp"
            count={phoneCount}
          />
          <CategoryCard
            category="tablets"
            image="/img/category-tablets.webp"
            count={tabletCount}
          />
          <CategoryCard
            category="accessories"
            image="/img/category-accessories.webp"
            count={accessoriesCount}
          />
        </div>
      </section>

      <ProductsSlider title="Brand new" products={brandNew} />
    </div>
  );
};
