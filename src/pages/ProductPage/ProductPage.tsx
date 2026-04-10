import { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { Product } from '../../types/Product';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
}

const TITLES = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const ProductPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  const updateParams = (key: string, value: string) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (key === 'perPage' && value === 'all') {
        newParams.delete('perPage');
      } else {
        newParams.set(key, value);
      }

      if (key !== 'page') {
        newParams.set('page', '1');
      }

      return newParams;
    });
  };

  const getSorted = (item: Product[]) => {
    return [...item].sort((a, b) => {
      if (sort === 'age') {
        return b.year - a.year;
      }

      if (sort === 'title') {
        return a.name.localeCompare(b.name);
      }

      if (sort === 'price') {
        return a.price - b.price;
      }

      return 0;
    });
  };

  const sortedProducts = getSorted(products);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(
          (page - 1) * Number(perPage),
          page * Number(perPage),
        );

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>Something went wrong</p>
        <button
          className={styles.reload}
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>There are no {category} yet</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbs__link}>
          <Icon name="home" />
        </Link>
        <span className={styles.breadcrumbs__arrow}>&gt;</span>
        <span className={styles.breadcrumbs__current}>{TITLES[category]}</span>
      </nav>
      <h1 className={styles.title}>{TITLES[category]}</h1>
      <p className={styles.count}>{products.length} models</p>
      <div className={styles.filters}>
        <div className={styles.filters__group}>
          <label htmlFor="sort-select" className={styles.filters__label}>
            Sort by
          </label>
          <select
            id="sort-select"
            className={styles.filters__select}
            value={sort}
            onChange={e => updateParams('sort', e.target.value)}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filters__group}>
          <label htmlFor="per-page-select" className={styles.filters__label}>
            Items on page
          </label>
          <select
            id="per-page-select"
            className={styles.filters__select}
            value={perPage}
            onChange={e => updateParams('perPage', e.target.value)}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All' : option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pagination__btn}
            disabled={page === 1}
            onClick={() => updateParams('page', String(page - 1))}
          >
            <Icon name="left" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`${styles.pagination__page} ${
                p === page ? styles['pagination__page--active'] : ''
              }`}
              onClick={() => updateParams('page', String(p))}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pagination__btn}
            disabled={page === totalPages}
            onClick={() => updateParams('page', String(page + 1))}
          >
            <Icon name="right" />
          </button>
        </div>
      )}
    </div>
  );
};
