import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { ProductList } from '../components/ProductList';
import { useAsync } from '../hooks/useAsync';
import { getProductsByCategory } from '../services/api';
import { Category, Product, SortBy } from '../types';
import { CATEGORY_LABELS } from '../utils/constants';
import { getAssetUrl } from '../utils/asset';
import styles from './pages.module.scss';

type Props = {
  category: Category;
};

function sortProducts(products: Product[], sort: SortBy) {
  const sorted = [...products];

  switch (sort) {
    case 'title':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'price':
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'age':
    default:
      sorted.sort((a, b) => b.year - a.year);
  }

  return sorted;
}

export const CategoryPage = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error } = useAsync(
    () => getProductsByCategory(category),
    [category],
  );

  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const sort = (searchParams.get('sort') as SortBy) || 'age';
  const page = Number(searchParams.get('page') || '1');
  const perPageRaw = searchParams.get('perPage') || 'all';

  const prepared = useMemo(() => {
    if (!data) {
      return [];
    }

    const filtered = query
      ? data.filter(product => product.name.toLowerCase().includes(query))
      : data;

    return sortProducts(filtered, sort);
  }, [data, query, sort]);

  const perPage =
    perPageRaw === 'all' ? prepared.length || 1 : Number(perPageRaw);

  const visible =
    perPageRaw === 'all'
      ? prepared
      : prepared.slice((page - 1) * perPage, page * perPage);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <div>
        <p>Something went wrong</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  if (!data.length) {
    return <p>There are no {category} yet</p>;
  }

  return (
    <div className={styles.page}>
      <h1>{CATEGORY_LABELS[category]}</h1>
      <p>{prepared.length} models</p>

      <div className={styles.filtersRow}>
        <label className={styles.sortLabel}>
          <span className={styles.sortText}>Sort by</span>

          <div className={styles.selectWrap}>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={event => {
                const nextSort = event.target.value;

                setSearchParams(prev => {
                  const next = new URLSearchParams(prev);

                  if (nextSort === 'age') {
                    next.delete('sort');
                  } else {
                    next.set('sort', nextSort);
                  }

                  next.delete('page');

                  return next;
                });
              }}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>

            <span className={styles.selectArrow} aria-hidden="true">
              <img src={getAssetUrl('img/Vector%20(Stroke).png')} alt="Icon" />
            </span>
          </div>
        </label>

        <label className={styles.sortLabel}>
          <span className={styles.sortText}>Items on page</span>

          <div className={styles.selectWrap}>
            <select
              className={styles.sortSelect}
              value={perPageRaw}
              onChange={event => {
                const nextValue = event.target.value;

                setSearchParams(prev => {
                  const next = new URLSearchParams(prev);

                  if (nextValue === 'all') {
                    next.delete('perPage');
                  } else {
                    next.set('perPage', nextValue);
                  }

                  next.delete('page');

                  return next;
                });
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>

            <span className={styles.selectArrow} aria-hidden="true">
              <img src={getAssetUrl('img/Vector%20(Stroke).png')} alt="Icon" />
            </span>
          </div>
        </label>
      </div>

      {!visible.length ? (
        <p>There are no {category} matching the query</p>
      ) : (
        <ProductList products={visible} />
      )}

      <Pagination total={prepared.length} />
    </div>
  );
};
