/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useMemo } from 'react';
import { Category, Product } from '../../types/Product';
import { ProductList } from './components/ProductList';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Filter } from './components/Filter';
import { useCategoryProducts } from './hooks/useCategoryProducts';
import { Loader } from '../shared/components/Loader';
import { ErrorNotice } from '../shared/components/ErrorNotice';
import { CATEGORIES } from '../shared/constants';
import { Pagination } from '../shared/components/Pagination';
import s from './CategoryPage.module.scss';
import { useSearchParamsState } from './hooks/useSearchParamsState';

const sortProducts = (products: Product[], sortBy: string) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'age':
      sorted.sort((a, b) => b.year - a.year);
      break;
    case 'title':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price':
      sorted.sort((a, b) => a.price - b.price);
      break;
    default:
      break;
  }

  return sorted;
};

interface Props {
  category: Category;
}

export const CategoryPage: FC<Props> = ({ category }) => {
  const { products, isLoading, errorMessage } = useCategoryProducts(category);

  const {
    sortBy,
    perPage,
    currentPage,
    query,
    setSortBy,
    setPerPage,
    setCurrentPage,
  } = useSearchParamsState();

  const sortedProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = products.filter(prod =>
      prod.name.toLowerCase().includes(normalizedQuery),
    );

    return sortProducts(filtered, sortBy);
  }, [products, sortBy, query]);

  const total = sortedProducts.length;

  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * Number(perPage);

    return sortedProducts.slice(start, start + Number(perPage));
  }, [sortedProducts, perPage, currentPage]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main>
      <section className={s.container}>
        <Breadcrumbs
          paths={[{ link: null, label: CATEGORIES[category].name }]}
        />
        <h1>{CATEGORIES[category].title}</h1>
        {isLoading && <Loader />}
        {errorMessage && (
          <ErrorNotice message={errorMessage} onReload={handleReload} />
        )}
        {!isLoading && !errorMessage && (
          <>
            {paginatedProducts.length === 0 ? (
              <>
                <Filter
                  sortBy={sortBy}
                  onSort={setSortBy}
                  perPage={String(perPage)}
                  onPerPageChange={setPerPage}
                />
                <p>
                  There are no {CATEGORIES[category].name.toLowerCase()} yet.
                </p>
              </>
            ) : (
              <>
                <div className={s.count}>{total && total} models</div>
                <Filter
                  sortBy={sortBy}
                  onSort={setSortBy}
                  perPage={String(perPage)}
                  onPerPageChange={setPerPage}
                />
                <ProductList products={paginatedProducts} />
                {perPage !== 'all' && (
                  <Pagination
                    total={total}
                    perPage={Number(perPage)}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};
