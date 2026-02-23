/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import styles from './Catalog.module.scss';
import { ProductCardData, ProductCatalogAPI } from '../../types';
import { mapCatalogProducts } from '../../utils/mappers';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import {
  sortProducts,
  paginateProducts,
  generatePaginationPages,
  SortType,
} from '../../utils/catalogUtils';

import ProductNotFound from '../../UI/photos/product-not-found.png';

type CatalogParams = 'phones' | 'tablets' | 'accessories';

const Catalog = () => {
  /** ------------------- STATE ------------------- */
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortBy, setSortBy] = useState<string>('def');

  /** ------------------- ROUTER ------------------- */
  const params = useParams<{ category: CatalogParams }>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = window.location.pathname;

  /** ------------------- API INFO ------------------- */
  const getApiInfo = () => {
    switch (params.category) {
      case 'phones':
        return { title: 'Mobile Phones', url: '/api/phones.json' };
      case 'tablets':
        return { title: 'Tablets', url: '/api/tablets.json' };
      case 'accessories':
        return { title: 'Accessories', url: '/api/accessories.json' };
      default:
        return { title: 'Catalog', url: '' };
    }
  };

  const { title, url } = getApiInfo();

  /** ------------------- FETCH PRODUCTS ------------------- */
  useEffect(() => {
    if (!url) {
      return;
    }

    setIsLoading(true);
    fetch(url)
      .then(res => res.json())
      .then((data: ProductCatalogAPI[]) => {
        const mappedProducts = mapCatalogProducts(data);

        setProducts(mappedProducts);
        setIsLoading(false);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setProducts([]);
        setIsLoading(false);
      });
  }, [url]);

  /** ------------------- READ URL PARAMS ------------------- */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const sortFromUrl = searchParams.get('sort');
    const pageFromUrl = searchParams.get('page');
    const perPageFromUrl = searchParams.get('perPage');

    if (sortFromUrl) {
      setSortBy(sortFromUrl);
    }

    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl));
    }

    if (perPageFromUrl) {
      setItemsPerPage(
        perPageFromUrl === 'all' ? 'all' : Number(perPageFromUrl),
      );
    }
  }, [location.search]);

  /** ------------------- GET QUERY PARAM ------------------- */
  const searchQuery = useMemo(() => {
    const paramsQuery = new URLSearchParams(location.search);

    return (paramsQuery.get('query') || '').toLowerCase();
  }, [location.search]);

  /** ------------------- FILTER PRODUCTS ------------------- */
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery),
    );
  }, [products, searchQuery]);

  /** ------------------- SORT PRODUCTS ------------------- */
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy as SortType);
  }, [filteredProducts, sortBy]);

  /** ------------------- PAGINATION ------------------- */
  const totalPages =
    itemsPerPage === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    return paginateProducts(sortedProducts, currentPage, itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const paginationPages = useMemo(() => {
    const maxVisiblePages = window.innerWidth < 768 ? 5 : 7;

    return generatePaginationPages(totalPages, currentPage, maxVisiblePages);
  }, [currentPage, totalPages]);

  /** ------------------- UPDATE URL ------------------- */
  const updateSearchParams = (paramsToUpdate: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (
        value === '1' ||
        value === 'all' ||
        value === '' ||
        value === 'default'
      ) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  /** ------------------- RESET PAGE ON SORT/ITEMS CHANGE ------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortBy]);

  /** ------------------- HANDLERS ------------------- */
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value === 'all' ? 'all' : Number(e.target.value);

    setItemsPerPage(value);
    setCurrentPage(1);

    updateSearchParams({ perPage: String(value), page: '1' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('sort', value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);

    setCurrentPage(newPage);
    updateSearchParams({ page: String(newPage) });
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);

    setCurrentPage(newPage);
    updateSearchParams({ page: String(newPage) });
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    updateSearchParams({ page: String(page) });
  };

  if (!url) {
    return (
      <div className={styles.error}>
        <h1>Category not found</h1>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.error}>
        <h1>{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div className={styles.catalog}>
      <Breadcrumbs category={params.category} from={from} />

      <h1 className={styles.catalog__title}>{title}</h1>
      <p className={styles.catalog__count}>{sortedProducts.length} models</p>

      <div className={styles.catalog__labels}>
        <div className={styles.catalog__sort}>
          <label className={styles.catalog__labels_label} htmlFor="sort-select">
            Sort by:
          </label>
          <select
            id="sort-select"
            className={styles.catalog__labels_select}
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="def">Default</option>
            <option value="age">Newest</option>
            <option value="alphabet">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.catalog__productsDisplay}>
          <label
            className={styles.catalog__labels_label}
            htmlFor="items-select"
          >
            Items on page:
          </label>
          <select
            id="items-select"
            className={styles.catalog__labels_select}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.catalog__grid}>
        {isLoading ? (
          Array.from({ length: 25 }).map((_, index) => (
            <div key={index} className={styles.catalog__card}>
              <Skeleton variant="rectangular" width="100%" height={250} />
              <Skeleton variant="text" width="80%" style={{ marginTop: 8 }} />
              <Skeleton variant="text" width="60%" />
            </div>
          ))
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <div key={product.id} className={styles.catalog__card}>
              <ProductCard product={product} hotPrice={true} />
            </div>
          ))
        ) : (
          <div className={styles.catalog__empty}>
            <img
              src={ProductNotFound}
              alt="Product not found"
              className={styles.catalog__empty_img}
            />
            <p className={styles.catalog__empty_text}>
              There are no products matching your search.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pages={paginationPages}
          onPageClick={handlePageClick}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};

export default Catalog;
