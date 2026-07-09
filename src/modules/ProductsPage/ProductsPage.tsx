import { useEffect, useMemo, useState } from 'react';
import { Product, ProductCategory } from '../../features/types/productType';
import { getProducts } from '../../api/products';
import styles from './ProductsPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Chevron } from '../../components/icons/Chevron';
import { Dropdown } from '../../components/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SecondaryButton } from '../../components/SecondaryButton';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductsList';

type Props = {
  category: ProductCategory;
};

type Sort = 'age' | 'title' | 'price';

type PerPage = '4' | '8' | '16' | 'all';

const DEFAULT_PER_PAGE: PerPage = 'all';

const categoryTitles: Record<ProductCategory, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const emptyMessages: Record<ProductCategory, string> = {
  phones: 'There are no phones yet',
  tablets: 'There are no tablets yet',
  accessories: 'There are no accessories yet',
};

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
] as const;

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
] as const;

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = (searchParams.get('perPage') as PerPage) || DEFAULT_PER_PAGE;
  const page = Number(searchParams.get('page') || '1');

  const handlePerPageChange = (value: PerPage) => {
    const next = new URLSearchParams(searchParams);

    if (value === 'all') {
      next.delete('perPage');
    } else {
      next.set('perPage', value);
    }

    next.delete('page');

    setSearchParams(next);
  };

  const sort = (searchParams.get('sort') as Sort) || 'age';

  const handleSortChange = (value: Sort) => {
    const next = new URLSearchParams(searchParams);

    next.set('sort', value);
    next.delete('page');

    setSearchParams(next);
  };

  const loadProducts = () => {
    setLoading(true);
    setError('');

    getProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categoryProducts = useMemo(() => {
    return [...products].filter(p => p.category === category);
  }, [products, category]);

  const title = categoryTitles[category];

  const sortedProducts = useMemo(() => {
    const list = [...categoryProducts];

    switch (sort) {
      case 'title':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return list.sort((a, b) => b.year - a.year);
    }
  }, [categoryProducts, sort]);

  const totalItems = sortedProducts.length;

  const perPageNumber = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages =
    perPage === 'all' ? 1 : Math.max(1, Math.ceil(totalItems / perPageNumber));

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (safePage - 1) * perPageNumber;

    return sortedProducts.slice(start, start + perPageNumber);
  }, [sortedProducts, perPage, perPageNumber, safePage]);

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      next.delete('page');
    } else {
      next.set('page', String(nextPage));
    }

    setSearchParams(next);
  };

  const visiblePages = useMemo<(number | string)[]>(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safePage <= 2) {
      return [1, 2, 3, '...', totalPages];
    }

    if (safePage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages];
  }, [safePage, totalPages]);

  const showPagination = perPage !== 'all' && totalPages > 1;

  const count = categoryProducts.length;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.productPage__state}>
        <p className={styles.productPage__stateText}>Something went wrong</p>
        <button
          type="button"
          className={styles.productPage__reloadButton}
          onClick={loadProducts}
        >
          Reload
        </button>
      </div>
    );
  }

  if (!categoryProducts.length) {
    return (
      <div className={styles.productPage}>
        <div className={styles.productPage__wrapper}>
          <Breadcrumbs />
          <div className={styles.productPage__textBlock}>
            <h1 className={styles.productPage__title}>{title}</h1>
            <p className={styles.productPage__count}>0 models</p>
          </div>

          <p className={styles.productPage__emptyText}>
            {emptyMessages[category]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productPage__wrapper}>
        <Breadcrumbs />
        <div className={styles.productPage__textBlock}>
          <h1 className={styles.productPage__title}>{title}</h1>
          <p className={styles.productPage__count}>{count} models</p>
        </div>

        <div className={styles.productPage__main}>
          <div className={styles.productPage__controls}>
            <div className={styles.productPage__controlsSort}>
              <Dropdown
                title="Sort by"
                value={sort}
                options={SORT_OPTIONS}
                onChange={handleSortChange}
              />
            </div>
            <div className={styles.productPage__controlsPerPage}>
              <Dropdown
                title="Items on page"
                value={perPage}
                options={PER_PAGE_OPTIONS}
                onChange={handlePerPageChange}
              />
            </div>
          </div>

          <ProductList products={visibleProducts} />
        </div>

        {showPagination && (
          <div className={styles.productPage__pagination}>
            <SecondaryButton
              onClick={() => setPage(safePage - 1)}
              disabled={safePage === 1}
            >
              <Chevron direction="left" />
            </SecondaryButton>

            <div className={styles.productPage__paginationButtons}>
              {visiblePages.map((item, index) =>
                typeof item === 'string' ? (
                  <span
                    key={`dots-${index}`}
                    className={styles.productPage__dots}
                  >
                    ...
                  </span>
                ) : (
                  <SecondaryButton
                    key={item}
                    onClick={() => setPage(item)}
                    isActive={item === safePage}
                  >
                    {item}
                  </SecondaryButton>
                ),
              )}
            </div>

            <SecondaryButton
              onClick={() => setPage(safePage + 1)}
              disabled={safePage === totalPages}
            >
              <Chevron direction="right" />
            </SecondaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
