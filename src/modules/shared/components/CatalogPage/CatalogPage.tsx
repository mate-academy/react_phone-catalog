import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product } from '@/types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductsList } from '../ProductsList';
import { Loader } from '../Loader';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import styles from './CatalogPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';
type SortKey = 'age' | 'title' | 'price';

type Props = {
  category: Category;
  title: string;
};

const EMPTY_MESSAGES: Record<Category, string> = {
  phones: 'There are no phones yet',
  tablets: 'There are no tablets yet',
  accessories: 'There are no accessories yet',
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const DEFAULT_SORT: SortKey = 'age';
const DEFAULT_PER_PAGE = '16';
const VALID_SORT_VALUES: SortKey[] = ['age', 'title', 'price'];
const VALID_PER_PAGE_VALUES = ['4', '8', '16', 'all'] as const;

const isSortKey = (value: string | null): value is SortKey => {
  return VALID_SORT_VALUES.includes(value as SortKey);
};

const isPerPageValue = (
  value: string | null,
): value is (typeof VALID_PER_PAGE_VALUES)[number] => {
  return (
    value !== null &&
    VALID_PER_PAGE_VALUES.includes(
      value as (typeof VALID_PER_PAGE_VALUES)[number],
    )
  );
};

export const CatalogPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortFromUrl = searchParams.get('sort');
  const perPageFromUrl = searchParams.get('perPage');
  const pageFromUrl = searchParams.get('page');

  const sortParam: SortKey = isSortKey(sortFromUrl)
    ? sortFromUrl
    : DEFAULT_SORT;
  const perPageParam = isPerPageValue(perPageFromUrl)
    ? perPageFromUrl
    : DEFAULT_PER_PAGE;
  const pageParam = Math.max(1, Math.floor(Number(pageFromUrl) || 0));

  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value === DEFAULT_SORT) {
        params.delete('sort');
      } else {
        params.set('sort', value);
      }

      return params;
    });
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.delete('page');

      if (value === DEFAULT_PER_PAGE) {
        params.delete('perPage');
      } else {
        params.set('perPage', value);
      }

      return params;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }

      return params;
    });

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const controller = new AbortController();

    setError(false);
    setIsLoading(true);

    fetch('./api/products.json', { signal: controller.signal })
      .then<Product[]>(res => res.json())
      .then(data => {
        setProducts(data.filter(p => p.category === category));
        setIsLoading(false);
      })
      .catch(err => {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [category, retryCount]);

  const sortedProducts: Product[] = [...products].sort((a, b) => {
    if (sortParam === 'age') {
      return b.year - a.year;
    }

    if (sortParam === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortParam === 'price') {
      return a.price - b.price;
    }

    return 0;
  });
  const totalPages =
    perPageParam === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / Number(perPageParam));

  const currentPage = Math.min(pageParam, Math.max(totalPages, 1));

  const perPageNum = Number(perPageParam);
  const sliceStart = (currentPage - 1) * perPageNum;
  const visibleProducts: Product[] =
    perPageParam === 'all'
      ? sortedProducts
      : sortedProducts.slice(sliceStart, sliceStart + perPageNum);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className={styles.title}>{title}</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.error}>
          <p>Something went wrong</p>
          <button
            className={styles.reloadButton}
            onClick={() => setRetryCount(c => c + 1)}
          >
            Reload
          </button>
        </div>
      ) : products.length === 0 ? (
        <p>{EMPTY_MESSAGES[category]}</p>
      ) : (
        <>
          <p className={styles.count}>{products.length} models</p>
          <div className={styles.controls}>
            <div className={styles.sortControl}>
              <Dropdown
                label="Sort by"
                value={sortParam}
                options={SORT_OPTIONS}
                onChange={handleSortChange}
              />
            </div>
            <div className={styles.perPageControl}>
              <Dropdown
                label="Items on page"
                value={perPageParam}
                options={PER_PAGE_OPTIONS}
                onChange={handlePerPageChange}
              />
            </div>
          </div>
          <ProductsList products={visibleProducts} />

          {perPageParam !== 'all' && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
