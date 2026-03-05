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
  /** ---------------- STATE ---------------- */

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** ---------------- ROUTER ---------------- */

  const params = useParams<{ category: CatalogParams }>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = window.location.pathname;

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  /** ---------------- URL PARAMS ---------------- */

  const currentPage = Number(searchParams.get('page')) || 1;

  const itemsPerPage: number | 'all' =
    searchParams.get('perPage') === 'all'
      ? 'all'
      : Number(searchParams.get('perPage')) || 8;

  const sortBy = (searchParams.get('sort') || 'def') as SortType;

  const searchQuery = (searchParams.get('query') || '').toLowerCase();

  /** ---------------- API INFO ---------------- */

  const getApiInfo = () => {
    switch (params.category) {
      case 'phones':
        return {
          title: 'Mobile Phones',
          url: `${import.meta.env.BASE_URL}api/phones.json`,
        };

      case 'tablets':
        return {
          title: 'Tablets',
          url: `${import.meta.env.BASE_URL}api/tablets.json`,
        };

      case 'accessories':
        return {
          title: 'Accessories',
          url: `${import.meta.env.BASE_URL}api/accessories.json`,
        };

      default:
        return { title: 'Catalog', url: '' };
    }
  };

  const { title, url } = getApiInfo();

  /** ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    if (!url) {
      return;
    }

    setIsLoading(true);

    fetch(url)
      .then(res => res.json())
      .then((data: ProductCatalogAPI[]) => {
        setProducts(mapCatalogProducts(data));
        setIsLoading(false);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setProducts([]);
        setIsLoading(false);
      });
  }, [url]);

  /** ---------------- FILTER ---------------- */

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery),
    );
  }, [products, searchQuery]);

  /** ---------------- SORT ---------------- */

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  /** ---------------- PAGINATION ---------------- */

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

  /** ---------------- UPDATE URL ---------------- */

  const updateSearchParams = (paramsToUpdate: Record<string, string>) => {
    const urlParams = new URLSearchParams(location.search);

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === '' || value === '1' || value === 'def') {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });

    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  /** ---------------- HANDLERS ---------------- */

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;

    updateSearchParams({
      perPage: value,
      page: '1',
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParams({
      sort: e.target.value,
      page: '1',
    });
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);

    updateSearchParams({
      page: String(newPage),
    });
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);

    updateSearchParams({
      page: String(newPage),
    });
  };

  const handlePageClick = (page: number) => {
    updateSearchParams({
      page: String(page),
    });
  };

  /** ---------------- ERRORS ---------------- */
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
