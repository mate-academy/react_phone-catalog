import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api';
import { Product } from '../../types';
import { ProductsList } from './components/ProductsList';
import { Dropdown } from '../shared/components/Dropdown';
import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../shared/components/Loader';
import { Pagination } from './components/Pagination';
import { useQueryParams } from '../../hooks/usePagination';
import styles from './CategoryPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';
type SortBy = 'newest' | 'alphabetically' | 'cheapest';

const categoryTitles: Record<Category, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const perPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const CategoryPage = () => {
  const { category } = useParams<{ category: Category }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    page,
    perPage,
    sortBy,
    perPageParam,
    sortParam,
    setPage,
    setPerPage,
    setSortBy,
  } = useQueryParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setProducts([]);

    getProductsByCategory(category as Category)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  if (!Object.keys(categoryTitles).includes(category as string)) {
    return <NotFoundPage />;
  }

  const title = categoryTitles[category as Category];

  const sorted = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      case 'newest':
      default:
        return b.year - a.year;
    }
  });

  const total = sorted.length;
  const totalPages = perPage === 'all' ? 1 : Math.ceil(total / perPage);
  const paginatedProducts =
    perPage === 'all'
      ? sorted
      : sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{products.length} models</p>

      {!loading && !error && products.length > 1 && (
        <div className={styles.controls}>
          <Dropdown
            label="Sort by"
            options={sortOptions}
            value={sortParam ?? 'newest'}
            onChange={setSortBy}
          />
          <Dropdown
            label="Items on page"
            options={perPageOptions}
            value={perPageParam || 'all'}
            onChange={setPerPage}
          />
        </div>
      )}

      {loading && <Loader />}

      {!loading && error && <p>Something went wrong. Please try again.</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <>
          <ProductsList products={paginatedProducts} />
          {perPage !== 'all' && totalPages > 1 && (
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};
