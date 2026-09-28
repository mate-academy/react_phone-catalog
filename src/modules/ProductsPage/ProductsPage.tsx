import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { getProductsByCategory } from '../shared/api/products';
import {
  PerPageValue,
  Product,
  ProductCategory,
  SortValue,
} from '../shared/types/Product';
import {
  getTotalPages,
  paginateProducts,
  sortProducts,
} from '../shared/utils/products';
import { ProductsToolbar } from './components/ProductsToolbar';
import styles from './ProductsPage.module.scss';

const titles: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const emptyMessages: Record<ProductCategory, string> = {
  phones: 'There are no phones yet',
  tablets: 'There are no tablets yet',
  accessories: 'There are no accessories yet',
};

type Props = {
  category: ProductCategory;
};

const getSortValue = (value: string | null): SortValue => {
  return value === 'title' || value === 'price' ? value : 'age';
};

const getPerPageValue = (value: string | null): PerPageValue => {
  return value === '4' || value === '8' || value === '16' ? value : 'all';
};

export const ProductsPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const title = titles[category];
  const sort = getSortValue(searchParams.get('sort'));
  const perPage = getPerPageValue(searchParams.get('perPage'));
  const page = Math.max(Number(searchParams.get('page')) || 1, 1);
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sort);
  }, [filteredProducts, sort]);

  const totalPages = getTotalPages(sortedProducts.length, perPage);
  const normalizedPage = Math.min(page, totalPages || 1);
  const visibleProducts = paginateProducts(
    sortedProducts,
    normalizedPage,
    perPage,
  );

  useEffect(() => {
    if (page === normalizedPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (normalizedPage > 1) {
      params.set('page', String(normalizedPage));
    } else {
      params.delete('page');
    }

    setSearchParams(params, { replace: true });
  }, [normalizedPage, page, searchParams, setSearchParams]);

  const updateParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);

    updater(params);
    setSearchParams(params);
  };

  const handleSortChange = (value: SortValue) => {
    updateParams(params => {
      if (value === 'age') {
        params.delete('sort');
      } else {
        params.set('sort', value);
      }

      params.delete('page');
    });
  };

  const handlePerPageChange = (value: PerPageValue) => {
    updateParams(params => {
      if (value === 'all') {
        params.delete('perPage');
      } else {
        params.set('perPage', value);
      }

      params.delete('page');
    });
  };

  const handlePageChange = (newPage: number) => {
    updateParams(params => {
      if (newPage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(newPage));
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <section className={styles.state}>
        <h1>{title} page</h1>
        <p>Something went wrong</p>
        <button type="button" onClick={loadProducts}>
          Reload
        </button>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1>{title} page</h1>
      <p className={styles.count}>{products.length} models</p>

      <ProductsToolbar
        sort={sort}
        perPage={perPage}
        showPerPage={sortedProducts.length > 4}
        onSortChange={handleSortChange}
        onPerPageChange={handlePerPageChange}
      />

      {products.length === 0 ? (
        <p className={styles.message}>{emptyMessages[category]}</p>
      ) : sortedProducts.length === 0 ? (
        <p className={styles.message}>
          There are no {category} matching the query
        </p>
      ) : (
        <>
          <ProductsList products={visibleProducts} />

          <Pagination
            currentPage={normalizedPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};
