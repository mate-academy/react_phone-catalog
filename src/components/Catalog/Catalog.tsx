import styles from './Catalog.module.scss';
import { ItemCard } from '../ItemCard';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProduct } from '../../api';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { NotFoundPage } from '../NotFoundPage';
import { ErrorMessage } from '../ErrorMessage';
import { Breadcrumbs } from '../Breadcrumbs';

export const Catalog: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || '1';

  const { category } = useParams();

  const titles: Record<string, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const title = titles[category || ''] || null;

  const loadData = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const data = await getProduct();

      let filtered = data.filter(product => product.category === category);

      switch (sort) {
        case 'title':
          filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;

        case 'age':
          filtered = [...filtered].sort((a, b) => b.year - a.year);
      }

      setProducts(filtered);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [category, sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  let visibleProducts = products;
  const isPaginationEnabled = perPage !== 'all';
  const limit = isPaginationEnabled ? Number(perPage) : products.length;

  if (isPaginationEnabled) {
    const start = (+currentPage - 1) * limit;
    const end = start + limit;

    visibleProducts = products.slice(start, end);
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', value);
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  const validCategories = ['phones', 'tablets', 'accessories'];

  if (!validCategories.includes(category || '')) {
    return <NotFoundPage />;
  }

  if (!products) {
    return <h1 className="no-product-yet">There are no {category} yet</h1>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__content}>
        <div className={styles.catalog__breadcrumbs}>
          <Breadcrumbs category={category} />
        </div>
        <div className={styles.catalog__title}>{title}</div>
        <span className={styles.catalog__countOfModels}>
          {visibleProducts.length} models
        </span>

        <div className={styles.catalog__params}>
          <div className={styles.catalog__params__sortBy}>
            <div className={styles.catalog__params__title}>
              <span>Sort by</span>
            </div>
            <select
              className={styles.catalog__params__select}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div className={styles.catalog__params__itemsOnPage}>
            <div className={styles.catalog__params__title}>
              <span>Items on page</span>
            </div>
            <select
              className={styles.catalog__params__select}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="all">All</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>

        <div className={styles.catalog__body}>
          {isLoading ? (
            <Loader />
          ) : (
            visibleProducts.map(item => {
              return <ItemCard key={item.id} item={item} />;
            })
          )}
        </div>

        {isPaginationEnabled && (
          <div className={styles.catalog__pages}>
            <Pagination
              totalPage={products.length}
              perPage={limit}
              currentPage={+currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
