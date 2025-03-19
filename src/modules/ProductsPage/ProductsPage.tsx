import { useProductsContext } from 'contexts/ProductsContext';
import { Loader } from 'modules/shared/components/Loader';
import { RouteParams } from 'modules/shared/types/Routes';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { ProductCard } from 'modules/shared/components/ProductCard';
import { NotFoundPage } from 'modules/NotFoundPage';
import { Breadcrumbs } from 'modules/shared/components/Breadcrumbs';
import { Dropdown } from './components/Dropdown';

export const ProductsPage: React.FC = () => {
  const { category } = useParams<RouteParams>();
  const { data, loading, error } = useProductsContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'Newest';
  const itemsOnPageParam = searchParams.get('itemsOnPage') || 'All';

  const validCategories = ['phones', 'tablets', 'accessories'];
  const sortByOptions = ['Newest', 'Alphabetically', 'Cheapest'];
  const itemsOnPageOptions = ['All', '4', '8', '16'];

  const updateSearchParams = (
    paramName: string,
    value: string,
    defaultValue: string,
  ) => {
    const curParams = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      curParams.delete(paramName);
    } else {
      curParams.set(paramName, value);
    }

    setSearchParams(curParams);
  };

  const handleSortBySelect = (value: string) => {
    updateSearchParams('sort', value, 'Newest');
  };

  const handleItemsOnPageSelect = (value: string) => {
    updateSearchParams('itemsOnPage', value, 'All');
  };

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
          <Link to="/">Back to home</Link>
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
      <Breadcrumbs />

      <h1 className={styles.categoryTitle}>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'Category'}
      </h1>

      <span
        className={styles.numOfProducts}
      >{`${products?.length} models`}</span>

      <div className={styles.productsControls}>
        <div className={styles.sortContainer}>
          <Dropdown
            label={'Sort by'}
            selectedOption={sortParam}
            options={sortByOptions}
            onSelect={handleSortBySelect}
          />
        </div>

        <div className={styles.itemOnPageContainer}>
          <Dropdown
            label={'Items on page'}
            selectedOption={itemsOnPageParam}
            options={itemsOnPageOptions}
            onSelect={handleItemsOnPageSelect}
          />
        </div>
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
