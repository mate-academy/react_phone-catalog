import { HeroCarousel } from './components/HeroCarousel';
import styles from './HomePage.module.scss';
import '../shared/styles/_container.scss';
import classNames from 'classnames';

import { CategoryList } from './components/CategoryList';
import { ProductsSection } from '../shared/components/ProductsSection';
import { useHomePageData } from './useHomePageData';
import { Loader } from '../shared/components/Loader';

export const HomePage = () => {
  const { photos, newProducts, productsOnSale, isLoading } = useHomePageData();

  if (isLoading) {
    return (
      <div className={classNames(styles['home-page__loader'], 'container')}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classNames(styles['home-page'], 'container')}>
      <section className={classNames(styles.section, styles['section--hero'])}>
        <div className={styles.section__header}>
          <h1 className={styles['home-page__title']}>Product Catalog</h1>
        </div>

        <div
          className={classNames(
            styles.section__content,
            styles['section__content--hero'],
          )}
        >
          <HeroCarousel images={photos} />
        </div>
      </section>

      <ProductsSection title="Brand new models" products={newProducts} />

      <section className={classNames(styles.section, styles['section--list'])}>
        <h2 className={styles.section__title}>Shop by category</h2>

        <div className={styles.section__content}>
          <CategoryList />
        </div>
      </section>

      <ProductsSection title="Hot prices" products={productsOnSale} />
    </div>
  );
};
