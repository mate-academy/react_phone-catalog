import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { Product } from '../../types/types';
import { ProductsContext } from '../../context/ProductsContext';
import { fetchProducts } from '../../services/products';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from './components/ProductsList';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { NotFoundPage } from '../NotFoundPage';
import { useLoading } from '../../context/LoadingContext';

const ALLOWED_CATEGORIES = ['phones', 'tablets', 'accessories'];

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { goods, updateGoods } = useContext(ProductsContext);
  const { isLoading, setIsLoading } = useLoading();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPerPageActive, setIsPerPageActive] = useState(false);

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage');

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);

    fetchProducts()
      .then(data => updateGoods(data as Product[]))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetchProducts()
      .then(data => {
        updateGoods(data as Product[]);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, [updateGoods, setIsLoading]);

  useEffect(() => {
    if (goods?.length) {
      setFilteredProducts(goods.filter(good => good.category === categoryName));
    }
  }, [goods, categoryName]);

  const productsAmount = useMemo(() => filteredProducts.length, [filteredProducts]);

  const sortByOption = useMemo(
    () => [
      { name: 'Newest', value: 'age' },
      { name: 'Alphabetically', value: 'title' },
      { name: 'Cheapest', value: 'price' },
    ],
    [],
  );
  const itemsPerPageOptions = useMemo(() => ['4', '8', '16', 'All'], []);

  const onSortBySelected = (value: string) => {
    setIsSortActive(false);

    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const onPerPageSelected = (value: string) => {
    setIsPerPageActive(false);

    const params = new URLSearchParams(searchParams);

    if (value === 'All') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    setSearchParams(params);
  };

  const sortedProducts = useMemo(() => {
    switch (sortBy) {
      case 'age':
        return filteredProducts.sort((a, b) => b.year - a.year);
      case 'title':
        return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'price':
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  }, [sortBy, filteredProducts]);

  const getCategoryDisplayName = (category: string | undefined) => {
    if (!category) {
      return 'Category';
    }

    switch (category.toLowerCase()) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  if (hasError) {
    return (
      <div className={styles.error}>
        <h1>Something went wrong. Please try again</h1>
        <button onClick={handleRetry} className={styles.error__retryButton}>
          Reload
        </button>
      </div>
    );
  }

  if (!ALLOWED_CATEGORIES.includes(categoryName || '')) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbsContainer}>
        <Breadcrumbs />
      </div>

      {isLoading ? (
        <Loader />
      ) : productsAmount > 0 ? (
        <>
          <h1 className={styles.page__heading}>{getCategoryDisplayName(categoryName)}</h1>
          <p className={styles.page__goodsAmount}>{productsAmount} models</p>

          <div className={styles.page__filters}>
            <div className={styles.page__filters_sort}>
              <p className={styles.page__filters_name}>Sort by</p>
              <div className={styles.dropdown}>
                <button
                  className={`${styles.dropdown__button} ${isSortActive ? styles['dropdown__button--active'] : ''}`}
                  onClick={() => setIsSortActive(!isSortActive)}
                  onBlur={() => setIsSortActive(false)}
                >
                  {sortByOption.find(option => option.value === sortBy)?.name}
                  <span
                    className={`${styles.dropdown__icon} ${isSortActive ? styles['dropdown__icon--up'] : styles['dropdown__icon--down']}`}
                  ></span>
                </button>
                <div
                  className={`${styles.dropdown__content} ${isSortActive ? styles['dropdown__content--active'] : ''}`}
                >
                  <ul className={styles.dropdown__list}>
                    {sortByOption.map(option => (
                      <li
                        className={`${styles.dropdown__option} ${sortBy === option.value ? styles['dropdown__option--selected'] : ''}`}
                        key={option.value}
                        onClick={() => onSortBySelected(option.value)}
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.page__filters_itemsPerPage}>
              <p className={styles.page__filters_name}>Items on page</p>
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdown__button}
                  onClick={() => setIsPerPageActive(!isPerPageActive)}
                  onBlur={() => setIsPerPageActive(false)}
                >
                  {perPage || 'All'}
                  <span
                    className={`${styles.dropdown__icon} ${isPerPageActive ? styles['dropdown__icon--up'] : styles['dropdown__icon--down']}`}
                  ></span>
                </button>
                <div
                  className={`${styles.dropdown__content} ${isPerPageActive ? styles['dropdown__content--active'] : ''}`}
                >
                  <ul className={styles.dropdown__list}>
                    {itemsPerPageOptions.map(option => (
                      <li
                        className={`${styles.dropdown__option} ${
                          (perPage === null && option === 'All') || perPage === option
                            ? styles['dropdown__option--selected']
                            : ''
                        }`}
                        key={option}
                        onClick={() => onPerPageSelected(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ProductsList itemsPerPage={perPage ? +perPage : productsAmount} items={sortedProducts} />
        </>
      ) : (
        <>
          <h1 className={styles.page__heading_noProducts}>
            {getCategoryDisplayName(categoryName)}
          </h1>
          <p className={styles.page__message_noProducts}>There are no {categoryName} yet.</p>
        </>
      )}
    </div>
  );
};
