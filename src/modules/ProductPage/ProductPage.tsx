import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchClient';
import { sortProducts } from '../../utils/sortProducts';
import { Pagination } from './components/Pagination';
import { ProductsList } from './components/ProductsList';
import { Loader } from '../shared/ui/Loader/Loader';
import { ChevronDownIcon } from '../shared/ui/Icons/Icons';
import styles from './ProductPage.module.scss';

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];
const SORT_OPTIONS = ['age', 'title', 'price'];

type Props = {
  category?: Product['category'];
};

export const ProductPage = ({ category: categoryProp }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { category: categoryFromParams = '' } = useParams<{
    category: string;
  }>();
  const category = categoryProp || categoryFromParams;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const sortParam = searchParams.get('sort') || 'age';
  const sort = SORT_OPTIONS.includes(sortParam) ? sortParam : 'age';
  const query = searchParams.get('query') || '';
  const perPageRaw = searchParams.get('perPage') || 'all';
  const perPageParam = PER_PAGE_OPTIONS.includes(perPageRaw)
    ? perPageRaw
    : 'all';
  const pageRaw = Number(searchParams.get('page'));
  const page = Number.isInteger(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(allProducts => {
        setCategoryProducts(
          allProducts.filter(item => item.category === category),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'age') {
      newParams.delete('sort');
    } else if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', value);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const filteredByQuery = categoryProducts.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const products = sortProducts(filteredByQuery, sort);

  const perPage =
    perPageParam === 'all' ? products.length || 1 : Number(perPageParam);
  const pageCount = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * perPage;
  const paginatedProducts = products.slice(start, start + perPage);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className={styles.message}>
          <p>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={handleReload}
          >
            Reload
          </button>
        </div>
      );
    }

    if (categoryProducts.length === 0) {
      return <p className={styles.message}>There are no {category} yet</p>;
    }

    if (products.length === 0) {
      return (
        <p className={styles.message}>
          There are no {category} matching the query
        </p>
      );
    }

    return (
      <>
        <p className={styles.count}>{products.length} models</p>

        <ProductsList products={paginatedProducts} className={styles.grid} />

        {pageCount > 1 && (
          <Pagination
            total={products.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{categoryTitle} page</h1>

      <div className={styles.toolbar}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Sort by</span>
          <span className={styles.selectWrap}>
            <select
              className={styles.select}
              value={sort}
              onChange={event => handleSortChange(event.target.value)}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
            <ChevronDownIcon className={styles.selectChevron} />
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Items on page</span>
          <span className={styles.selectWrap}>
            <select
              className={styles.select}
              value={perPageParam}
              onChange={event => handlePerPageChange(event.target.value)}
            >
              {PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All' : option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className={styles.selectChevron} />
          </span>
        </label>
      </div>

      {renderContent()}
    </div>
  );
};
