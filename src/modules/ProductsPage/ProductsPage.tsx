import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import styles from './ProductsPage.module.scss';

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

type Props = {
  category: string;
  title: string;
};

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'age':
      return sorted.sort((a, b) => b.year - a.year);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
}

export const ProductsPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = +(searchParams.get('page') || '1');
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(all => {
        setProducts(all.filter(p => p.category === category));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    if (!query) {
      return products;
    }

    const q = query.toLowerCase().trim();

    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const itemsPerPage = perPage === 'all' ? sorted.length : +perPage;
  const start = (page - 1) * itemsPerPage;
  const visible = sorted.slice(start, start + itemsPerPage);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    if (key !== 'page') {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className="page__title">{title}</h1>
      <p className="page__subtitle">{filtered.length} models</p>

      {isLoading && <Loader />}

      {isError && !isLoading && (
        <div className={styles.productsPage__error}>
          <p>Something went wrong. Please try again.</p>
          <button
            type="button"
            className={styles.productsPage__reload}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className={styles.productsPage__empty}>
          {query
            ? `No search results for "${query}"`
            : `There are no ${category} yet`}
        </p>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <div className={styles.productsPage__filters}>
            <Dropdown
              label="Sort by"
              value={sort}
              options={SORT_OPTIONS}
              onChange={v => updateParams('sort', v)}
            />
            <Dropdown
              label="Items on page"
              value={perPage}
              options={PER_PAGE_OPTIONS}
              onChange={v => updateParams('perPage', v)}
            />
          </div>

          <div className={styles.productsPage__grid} data-cy="productList">
            {visible.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {perPage !== 'all' && (
            <Pagination
              total={sorted.length}
              perPage={itemsPerPage}
              currentPage={page}
              onPageChange={p => updateParams('page', String(p))}
            />
          )}
        </>
      )}
    </div>
  );
};
