import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryName } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { useFetch } from '../../hooks/useFetch';
import { getSearchWith } from '../../utils/getSearchWith';
import { ProductsSkeleton } from '../shared/components/ProductsSkeleton';
import { ProductsList } from '../shared/components/ProductsList';
import { Pagination } from '../shared/components/Pagination';
import { ErrorMessage, EmptyMessage } from '../shared/components/RequestStatus';
import { SortControls } from './components/SortControls';
import styles from './CatalogPage.module.scss';

type Props = {
  category: CategoryName;
  title: string;
  emptyMessage: string;
};

export const CatalogPage: React.FC<Props> = ({
  category,
  title,
  emptyMessage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: products,
    loading,
    error,
  } = useFetch(() => getProductsByCategory(category), [category]);

  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const perPageParam = searchParams.get('perPage');
  const page = Number(searchParams.get('page')) || 1;

  const visibleProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let result = [...products];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery),
      );
    }

    switch (sort) {
      case 'title':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      default:
        result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [products, sort, query]);

  const perPage = perPageParam ? Number(perPageParam) : visibleProducts.length;
  const total = visibleProducts.length;

  const paginatedProducts = perPageParam
    ? visibleProducts.slice((page - 1) * perPage, page * perPage)
    : visibleProducts;

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: newPage === 1 ? null : newPage,
      }),
    );
  };

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.page__title}>{title}</h1>

      {loading && <ProductsSkeleton />}
      {error && <ErrorMessage />}

      {products && (
        <>
          {products.length === 0 && <EmptyMessage message={emptyMessage} />}

          {products.length > 0 && (
            <>
              <SortControls />

              {total === 0 ? (
                <EmptyMessage
                  message={`There are no ${category} matching the query`}
                />
              ) : (
                <>
                  <ProductsList products={paginatedProducts} />

                  {perPageParam && (
                    <Pagination
                      total={total}
                      perPage={perPage}
                      currentPage={page}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
