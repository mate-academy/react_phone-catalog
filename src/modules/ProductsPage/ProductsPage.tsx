import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getProducts } from '../shared/services/api';
import { Product } from '../shared/types';
import { getNormalizedImagePath } from '../shared/getNormalizedImagePath';
import { PerPageSelect } from './components/PerPageSelect';
import { ProductList } from './components/ProductList/ProductList';
import { SortSelect } from './components/SortSelect/';
import styles from './ProductsPage.module.scss';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

type SearchParamKey = 'sort' | 'perPage' | 'page';

export const ProductsPage = ({ category, title }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const rawPage = Number(searchParams.get('page'));
  const page = !rawPage || rawPage < 1 ? 1 : rawPage;
  const perPage = searchParams.get('perPage') || 'all';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;

    const startTime = Date.now();

    try {
      const data = await getProducts();

      if (!isMounted) {
        return;
      }

      const categoryProducts = data
        .filter(product => product.category === category)
        .map(product => ({
          ...product,
          image: getNormalizedImagePath(product.image),
        }));

      const elapsedTime = Date.now() - startTime;
      const MIN_LOADER_DURATION = 350;
      const remainingTime = Math.max(0, MIN_LOADER_DURATION - elapsedTime);

      timerId = setTimeout(() => {
        if (isMounted) {
          setAllProducts(categoryProducts);
          setIsLoading(false);
        }
      }, remainingTime);
    } catch (error) {
      if (isMounted) {
        setHasError(true);
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [category]);

  useEffect(() => {
    const cleanupPromise = fetchProducts();

    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, [fetchProducts]);

  const sortedProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'age':
        default:
          return b.year - a.year;
      }
    });
  }, [allProducts, sort]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const itemsPerPage = Number(perPage);
    const startIndex = (page - 1) * itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, page, perPage]);

  const handleUpdateParam = useCallback(
    (key: SearchParamKey, value: string) => {
      const newParams = new URLSearchParams(searchParams);

      const isDefaultValue =
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all') ||
        (key === 'sort' && value === 'age');

      if (isDefaultValue) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      if (key === 'sort' || key === 'perPage') {
        newParams.delete('page');
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      handleUpdateParam('page', String(totalPages));
    }
  }, [totalPages, page, handleUpdateParam]);

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs} data-cy="breadCrumbs">
        <Link to="/" className={styles.breadcrumbsLink}>
          <img
            className={styles.btnHome}
            src="./img/icons/home.svg"
            alt="Home"
          />
        </Link>

        <img
          src="./img/icons/arrow-right-disabled.svg"
          alt=""
          aria-hidden="true"
        />
        <span className={styles.breadcrumbsLink}>{category}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <div className={styles.errorContainer}>
          <p>Something went wrong</p>
          <button type="button" onClick={fetchProducts}>
            Reload
          </button>
        </div>
      ) : (
        <>
          <p className={styles.categoryCount}>{allProducts.length} models</p>

          <div className={styles.controls}>
            <SortSelect
              value={sort}
              onChange={val => handleUpdateParam('sort', val)}
            />
            <PerPageSelect
              value={perPage}
              onChange={val => handleUpdateParam('perPage', val)}
            />
          </div>

          {allProducts.length === 0 ? (
            <p>There are no {category} yet</p>
          ) : (
            <ProductList
              products={visibleProducts}
              total={sortedProducts.length}
              perPage={perPage}
              currentPage={page}
              onPageChange={newPage =>
                handleUpdateParam('page', String(newPage))
              }
            />
          )}
        </>
      )}
    </main>
  );
};
