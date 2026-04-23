/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, NavLink } from 'react-router-dom';
import { Product } from '../../types/product';
import { getProducts } from '../../api/getProducts';
import { getSearchParams, SearchParams } from '../../utils/searchParams';
import { CatalogView } from '../../components/CatalogView';

import styles from './Catalog.module.scss';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Catalog = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setRetry] = useState(0);

  const handleRetry = () => {
    setRetry(prev => prev + 1);
  };

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts<Product[]>()
      .then(data => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const updateSearchParams = (params: SearchParams) => {
    setSearchParams(getSearchParams(params, searchParams));
  };

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch (sortBy) {
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy]);

  return (
    <main className={styles.catalog}>
      <nav className={styles.catalog__nav}>
        <NavLink to="/" className={styles['catalog__home-icon']} />
        <div className={styles.catalog__arrow} />
        <span className={styles['catalog__current-page']}>{category}</span>
      </nav>

      <h1 className={styles.catalog__title}>
        {category === 'phones' ? 'Mobile phones' : category}
      </h1>
      <p className={styles['catalog__models-count']}>
        {products.length} models
      </p>

      <div className={styles.catalog__filters}>
        <div className={styles['catalog__filter-group']}>
          <label className={styles.catalog__label}>Sort by</label>
          <select
            className={styles.catalog__select}
            value={sortBy}
            onChange={e =>
              updateSearchParams({ sort: e.target.value, page: '1' })
            }
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles['catalog__filter-group']}>
          <label className={styles.catalog__label}>Items on page</label>
          <select
            className={styles.catalog__select}
            value={perPage}
            onChange={e =>
              updateSearchParams({ perPage: e.target.value, page: '1' })
            }
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage onRetry={handleRetry} />}

      {!isLoading && !isError && (
        <CatalogView products={sortedProducts} styles={styles} />
      )}
    </main>
  );
};
