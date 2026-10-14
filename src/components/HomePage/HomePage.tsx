import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { assetUrl } from '../../utils/assets';
import { Loader } from '../Loader';
import { PicturesSlider } from '../PicturesSlider';
import { ProductsSlider } from '../ProductsSlider';
import styles from './HomePage.module.scss';

const categories = [
  { id: 'phones', name: 'Mobile phones' },
  { id: 'tablets', name: 'Tablets' },
  { id: 'accessories', name: 'Accessories' },
];

export const HomePage = () => {
  const { products, loading, error, reload } = useProducts();
  const newProducts = useMemo(
    () =>
      [...products]
        .sort(
          (first, second) =>
            second.year - first.year || second.sortOrder - first.sortOrder,
        )
        .slice(0, 12),
    [products],
  );
  const hotProducts = useMemo(
    () =>
      products
        .filter(product => product.fullPrice > product.price)
        .sort(
          (first, second) =>
            second.fullPrice - second.price - (first.fullPrice - first.price) ||
            first.sortOrder - second.sortOrder,
        )
        .slice(0, 12),
    [products],
  );

  return (
    <div className={`container ${styles.home}`}>
      <h1 className="visually-hidden">Product Catalog</h1>
      <p className={`page-title ${styles.welcome}`}>
        Welcome to Nice Gadgets store!
      </p>
      <PicturesSlider />

      {loading && <Loader />}
      {error && (
        <div className="empty-state" role="alert">
          <h2>Something went wrong</h2>
          <p>We could not load the products. Please try again.</p>
          <button type="button" className="primary-button" onClick={reload}>
            Reload
          </button>
        </div>
      )}

      {!loading && !error && (
        <ProductsSlider
          title="Brand new models"
          products={newProducts}
          showDiscount={false}
        />
      )}

      <section
        className={styles.categorySection}
        aria-labelledby="categories-heading"
      >
        <h2
          id="categories-heading"
          className={`page-subtitle ${styles.categoryHeading}`}
        >
          Shop by category
        </h2>
        <div className={styles.categories}>
          {categories.map(category => (
            <Link
              key={category.id}
              className={styles.category}
              to={`/${category.id}`}
            >
              <div className={`${styles.categoryImage} ${styles[category.id]}`}>
                <img
                  src={assetUrl(`img/figma-assets/category-${category.id}.png`)}
                  alt=""
                  loading="lazy"
                  width="368"
                  height="368"
                />
              </div>
              <h3>{category.name}</h3>
              <p>
                {loading
                  ? 'Loading models...'
                  : `${products.filter(product => product.category === category.id).length} models`}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {!loading && !error && (
        <ProductsSlider title="Hot prices" products={hotProducts} />
      )}
    </div>
  );
};
