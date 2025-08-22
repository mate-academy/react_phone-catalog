import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi } from '../../shared/api/fetchApi';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { ProductCategory } from '../../types/ProductCategory';
import { ProductForCard } from '../../types/Product/Product';
import { useCategoryCounts } from '../../shared/hooks/useCategoryCounts';
import { Filter } from './components/Filter';
import { ProductList } from './components/ProductList';
import { Pagination } from './components/Pagination';

import styles from './ProductPage.module.scss';

type Props = {
  category: ProductCategory;
  queryFromHeader?: string;
};

const getSortedProducts = (products: ProductForCard[], sortBy: string) => {
  switch (sortBy) {
    case 'age':
      return [...products].sort((a, b) => b.year - a.year);

    case 'title':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    default:
      return products;
  }
};

export const ProductsPage: React.FC<Props> = ({
  category,
  queryFromHeader,
}) => {
  const [products, setProducts] = useState<ProductForCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = searchParams.get('perPage') || '4';
  const query = (queryFromHeader ?? searchParams.get('query') ?? '').trim();

  const { counts, loading: countsLoading } = useCategoryCounts();

  const countMap: Record<string, keyof typeof counts> = {
    phones: 'mobile',
    tablets: 'tablets',
    accessories: 'accessories',
  };

  const count = counts[countMap[category]];

  const filterProducts = useMemo(() => {
    if (!query) {
      return products;
    }

    const q = query.toLowerCase();

    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const sortedProducts = getSortedProducts(filterProducts, sort);

  const perPageNumber =
    perPage.toLowerCase() === 'all'
      ? sortedProducts.length
      : parseInt(perPage, 10);

  const getSubtitleText = () => {
    if (countsLoading) {
      return 'Loading...';
    }

    if (count === 0) {
      return 'No models';
    }

    if (count === 1) {
      return '1 model';
    }

    return `${count} models`;
  };

  const getTitle = (goodsGroup: string): string => {
    switch (goodsGroup) {
      case 'phones':
        return 'Mobile phones';

      case 'tablets':
        return 'Tablets';

      case 'accessories':
        return 'Accessories';

      default:
        return 'Products';
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const start = Date.now();
        const allProducts = await fetchApi<ProductForCard[]>('/products.json');
        const filteredProducts = allProducts.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);

        const elapsed = Date.now() - start;
        const minDelay = 300;

        if (elapsed < minDelay) {
          setTimeout(() => setLoading(false), minDelay - elapsed);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load products. Please try again later');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (!loading && page > Math.ceil(sortedProducts.length / perPageNumber)) {
      setSearchParams({ sort, page: '1', perPage, query });
    }
  }, [
    loading,
    query,
    sortedProducts.length,
    page,
    perPage,
    perPageNumber,
    setSearchParams,
    sort,
  ]);

  const handleSortChange = (newSort: string) => {
    setSearchParams({ sort: newSort, page: '1', perPage, query });
  };

  const handlePerPageChange = (newPerPage: string) => {
    setSearchParams({ sort, page: '1', perPage: newPerPage, query });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ sort, page: newPage.toString(), perPage, query });
  };

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * perPageNumber,
    page * perPageNumber,
  );

  const breadcrumbs = [{ name: getTitle(category), path: `/${category}` }];

  if (loading) {
    return (
      <div className={styles.productPage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <h1 className={styles.productPage__title}>{getTitle(category)}</h1>

        <p className={styles.productPage__subtitle}>Loading...</p>

        <Filter
          sort={sort}
          perPage={perPage}
          onSortChange={handleSortChange}
          onPerPageChange={handlePerPageChange}
        />

        <ProductList
          products={[]}
          loading={loading}
          skeletonsCount={perPageNumber}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productPage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <h1 className={styles.productPage__title}>{getTitle(category)}</h1>

        <div className={styles.error}>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.productPage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <h1 className={styles.productPage__title}>{getTitle(category)}</h1>

        <div className={styles.empty}>
          <h2>There are no {category} yet</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productPage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className={styles.productPage__overlook}>
        <h1 className={styles.productPage__title}>{getTitle(category)}</h1>

        <p className={styles.productPage__subtitle}>{getSubtitleText()}</p>
      </div>

      <Filter
        sort={sort}
        perPage={perPage}
        onSortChange={handleSortChange}
        onPerPageChange={handlePerPageChange}
      />

      <ProductList products={paginatedProducts} />

      <Pagination
        totalItems={sortedProducts.length}
        itemsPerPage={perPageNumber}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
