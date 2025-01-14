import { useProductsContext } from 'contexts/ProductsContext';
import { Loader } from 'modules/shared/components/Loader';
import { RouteParams } from 'modules/shared/types/Routes';
import { useParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { ProductCard } from 'modules/shared/components/ProductCard';
import { NotFoundPage } from 'modules/NotFoundPage';

export const ProductsPage = () => {
  const { category } = useParams<RouteParams>();
  const { data, loading, error } = useProductsContext();

  const validCategories = ['phones', 'tablets', 'accessories'];

  if (!validCategories.includes(category || '')) {
    return <NotFoundPage />;
  }

  const products = category ? data[category] : undefined;

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span>{error}</span>
        <button
          className={styles.reloadButton}
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={styles.notFoundProducts}>
        <div className={styles.back}>
          <img src="img/icons/arrow-back.svg" alt="arrow-back" />
          <a href="#">Back to home</a>
        </div>
        <h1 className={styles.notFoundMessage}>There are no {category} yet.</h1>
        <img
          className={styles.notFoundProductsImage}
          src="img/product-not-found.png"
          alt="No products found"
        />
      </div>
    );
  }

  return (
    <div className={styles.catalogPage}>
      <div className={styles.breadcrumbs}></div>

      <h1 className={styles.categoryTitle}>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'Category'}
      </h1>

      <span
        className={styles.numOfProducts}
      >{`${products?.length} models`}</span>

      <div className={styles.sortOptions}>
        <div className={styles.sortBy}></div>
        <div className={styles.perPage}></div>
      </div>

      <div className={styles.productsList}>
        {products.map(product => (
          <div key={product.id} className={styles.productContainer}>
            <ProductCard product={product} showDiscount={false} />
          </div>
        ))}
      </div>

      <div className={styles.pagination}></div>
    </div>
  );
};
