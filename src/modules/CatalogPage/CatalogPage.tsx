import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import styles from './CatalogPage.module.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

interface Props {
  category: 'phones' | 'tablets' | 'accessories';
}

export const CatalogPage = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = +(searchParams.get('page') || 1);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProductsByCategory(category)
      .then(data => setProducts(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (newSort === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }

    setSearchParams(params);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (newPerPage === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', newPerPage);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const sortedProducts = [...products];

  sortedProducts.sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return (b.year || 0) - (a.year || 0);
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        const priceA = a.price || a.priceDiscount || 0;
        const priceB = b.price || b.priceDiscount || 0;

        return priceA - priceB;
      default:
        return 0;
    }
  });

  let visibleProducts = sortedProducts;
  let itemsPerPageNum = sortedProducts.length;

  if (perPage !== 'all') {
    itemsPerPageNum = Number(perPage);
    const startIndex = (currentPage - 1) * itemsPerPageNum;
    const endIndex = startIndex + itemsPerPageNum;

    visibleProducts = sortedProducts.slice(startIndex, endIndex);
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs category={category} />
      <h1 className={styles.page__title}>{category}</h1>
      <span className={styles.page__count}>{products.length} models</span>

      {!isLoading && !isError && products.length > 0 && (
        <div className={styles.page__filters}>
          <div className={styles.page__filter}>
            <label htmlFor="sort" className={styles.page__label}>
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className={styles.page__select}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>

          <div className={styles.page__filter}>
            <label htmlFor="perPage" className={styles.page__label}>
              Items on page
            </label>
            <select
              id="perPage"
              value={perPage}
              onChange={handlePerPageChange}
              className={styles.page__select}
            >
              <option value="all">All</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
      )}

      {isLoading && <div className={styles.page__message}>Loading...</div>}
      {isError && (
        <div className={styles.page__message}>
          <span>Something went wrong.</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={styles.page__reload_btn}
          >
            Reload
          </button>
        </div>
      )}
      {!isLoading && !isError && products.length === 0 && (
        <div className={styles.page__message}>There are no {category} yet.</div>
      )}

      {!isLoading && !isError && visibleProducts.length > 0 && (
        <>
          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && (
            <Pagination
              totalItems={sortedProducts.length}
              itemsPerPage={itemsPerPageNum}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
