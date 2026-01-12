import React, { useEffect, useState, useMemo } from 'react';
import { ProductList } from '../../components/ProductList';
import { getProductList, Product } from '../../api/products';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { useSearchParams, useParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SortAndPerPage } from '../../components/SortAndPerPage';
import { Category, CATEGORY_TITLES } from '../../types';
import styles from './CategoryPage.module.scss';
import { delay } from '../../utils';

const SORT_OPTIONS = [
  { value: 'year', label: 'Newest' },
  { value: 'title', label: 'Title' },
  { value: 'price', label: 'Price' },
];
const PER_PAGE_OPTIONS = [4, 8, 16, 'all'];

export const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') || '',
  );

  const sort = searchParams.get('sort') || 'year';
  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 'all';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setSearchValue(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams(params => {
        if (searchValue) {
          params.set('query', searchValue);
        } else {
          params.delete('query');
        }

        params.set('page', '1');

        return params;
      });
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const load = async () => {
    setLoading(true);
    setError(false);

    if (!category || !['phones', 'tablets', 'accessories'].includes(category)) {
      setProducts([]);
      setLoading(false);

      return;
    }

    try {
      const [data] = await Promise.all([
        getProductList(category as Category),
        delay(800),
      ]);

      setProducts(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const sortProducts = (items: Product[], sortBy: string) => {
    switch (sortBy) {
      case 'year':
        return [...items].sort((a, b) => b.year - a.year);
      case 'title':
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...items].sort(
          (a, b) =>
            (a.priceDiscount ?? a.price ?? 0) -
            (b.priceDiscount ?? b.price ?? 0),
        );
      default:
        return items;
    }
  };

  const filtered = useMemo(() => {
    let result = products;

    if (query) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    result = sortProducts(result, sort);

    return result;
  }, [products, query, sort]);

  const total = filtered.length;
  const perPageNum = perPage === 'all' ? total : +perPage;
  const totalPages = perPageNum === 0 ? 1 : Math.ceil(total / perPageNum);
  const paginated =
    perPage === 'all'
      ? filtered
      : filtered.slice((page - 1) * perPageNum, page * perPageNum);

  const handleSort = (value: string) => {
    setSearchParams(params => {
      params.set('sort', value);
      params.set('page', '1');

      return params;
    });
  };

  const handlePerPage = (value: string) => {
    setSearchParams(params => {
      params.set('perPage', value);
      params.set('page', '1');

      return params;
    });
  };

  const handlePage = (newPage: number) => {
    setSearchParams(params => {
      params.set('page', String(newPage));

      return params;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!category || !['phones', 'tablets', 'accessories'].includes(category)) {
    return <EmptyState message="Category not found" />;
  }

  const cat = category as Category;
  const title = CATEGORY_TITLES[cat];

  return (
    <section className={styles.categoryPage}>
      <Breadcrumbs
        showBreadcrumbs={true}
        breadcrumbs={[{ name: title }]}
        // title="Mobile phones"
        title={title}
        subtitle={`${total} model${total !== 1 ? 's' : ''}`}
      />
      <SortAndPerPage
        sortValue={sort}
        onSortChange={handleSort}
        sortOptions={SORT_OPTIONS}
        perPageValue={perPage}
        onPerPageChange={handlePerPage}
        perPageOptions={PER_PAGE_OPTIONS.map(opt => ({
          value: String(opt),
          label: opt === 'all' ? 'All' : String(opt),
        }))}
      />
      {error && <ErrorState message="Something went wrong" onRetry={load} />}
      {!error && (
        <>
          {!loading && paginated.length === 0 ? (
            <EmptyState
              message={
                query
                  ? `No ${title.toLowerCase()} matching "${query}"`
                  : `There are no ${title.toLowerCase()} yet`
              }
            />
          ) : (
            <>
              <ProductList products={paginated} isLoading={loading} />
              {!loading && totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPage={handlePage}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
