import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './CategoryPage.module.scss';
import { Loader } from '../../components/Loader';
import { useProducts } from '../../context/ProductsContext';
import { useMemo, useState } from 'react';
import { NotFoundPage } from '../NotFoundPage';
import { ProductsList } from '../../components/ProductsList';

const ALLOWED_CATEGORIES = ['phones', 'tablets', 'accessories'];

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, error } = useProducts();

  const [isDropdownOpen, setIsDropdownOpen] = useState({ sort: false, perPage: false });

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage');

  const sortOptions = useMemo(
    () => [
      { name: 'Newest', value: 'age' },
      { name: 'Alphabetically', value: 'title' },
      { name: 'Cheapest', value: 'price' },
    ],
    [],
  );

  const perPageOptions = useMemo(() => ['4', '8', '16', 'All'], []);

  const filteredProducts = useMemo(
    () => products.filter(product => product.category === categoryName),
    [products, categoryName],
  );

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case 'age':
        return copy.sort((a, b) => b.year - a.year);
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      default:
        return copy;
    }
  }, [filteredProducts, sortBy]);

  const productAmount = sortedProducts.length;

  const onSortChange = (value: string) => {
    setIsDropdownOpen(prev => ({ ...prev, sort: false }));
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSearchParams(params);
  };

  const onPerPageChange = (value: string) => {
    setIsDropdownOpen(prev => ({ ...prev, perPage: false }));
    const params = new URLSearchParams(searchParams);
    value === 'All' ? params.delete('perPage') : params.set('perPage', value);
    setSearchParams(params);
  };

  const getCategoryLabel = (name: string | undefined) => {
    switch (name) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Category';
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <h1>Something went wrong. Please try again</h1>
        <button className={styles.error__retryButton} onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  if (!ALLOWED_CATEGORIES.includes(categoryName || '')) return <NotFoundPage />;

  return (
    <div className={styles.categoryPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.categoryPage__title}>{getCategoryLabel(categoryName)}</h1>
          <p className={styles.categoryPage__modelsAmount}>{productAmount} models</p>

          <div className={styles.categoryPage__filters}>
            <div className={styles.categoryPage__filters_sort}>
              <p className={styles.categoryPage__filters_name}>Sort by:</p>
              <div
                className={styles.dropdown}
                tabIndex={0}
                onBlur={() => setIsDropdownOpen(p => ({ ...p, sort: false }))}
              >
                <button
                  className={`${styles.dropdown__button}`}
                  onClick={() => setIsDropdownOpen(p => ({ ...p, sort: !p.sort }))}
                >
                  {sortOptions.find(opt => opt.value === sortBy)?.name}
                  <span
                    className={`${styles.dropdown__icon} ${
                      isDropdownOpen.sort
                        ? styles['dropdown__icon--up']
                        : styles['dropdown__icon--down']
                    }`}
                  ></span>
                </button>

                <div
                  className={`${styles.dropdown__content} ${isDropdownOpen.sort ? styles['dropdown__content--active'] : ''}`}
                >
                  {isDropdownOpen.sort && (
                    <ul className={styles.dropdown__list}>
                      {sortOptions.map(opt => (
                        <li
                          className={`${styles.dropdown__option} ${
                            sortBy === opt.value ? styles['dropdown__option--selected'] : ''
                          }`}
                          key={opt.value}
                          onMouseDown={() => onSortChange(opt.value)}
                        >
                          {opt.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.categoryPage__filters_perPage}>
              <p className={styles.categoryPage__filters_name}>Items on page:</p>
              <div
                className={styles.dropdown}
                tabIndex={0}
                onBlur={() => setIsDropdownOpen(p => ({ ...p, sort: false }))}
              >
                <button
                  className={`${styles.dropdown__button}`}
                  onClick={() => setIsDropdownOpen(p => ({ ...p, perPage: !p.perPage }))}
                >
                  {perPage || 'All'}
                  <span
                    className={`${styles.dropdown__icon} ${
                      isDropdownOpen.perPage
                        ? styles['dropdown__icon--up']
                        : styles['dropdown__icon--down']
                    }`}
                  ></span>
                </button>

                <div
                  className={`${styles.dropdown__content} ${isDropdownOpen.perPage ? styles['dropdown__content--active'] : ''}`}
                >
                  {isDropdownOpen.perPage && (
                    <ul className={styles.dropdown__list}>
                      {perPageOptions.map(opt => (
                        <li
                          className={`${styles.dropdown__option} ${
                            (perPage === null && perPage === 'All') || perPage === opt
                              ? styles['dropdown__option--selected']
                              : ''
                          }`}
                          key={opt}
                          onClick={() => onPerPageChange(opt)}
                          onMouseDown={() => onPerPageChange(opt)}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ProductsList items={sortedProducts} itemsPerPage={perPage ? +perPage : productAmount} />
        </>
      )}
    </div>
  );
};
