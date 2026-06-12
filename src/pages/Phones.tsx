import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Bredcrumbs';

import styles from './Phones.module.scss';
import { getProducts } from '../api/products';
import { ProductList } from '../components/ProductList/ProductList';
import { Pagination } from '../components/Pagination/Pagination';
import { Product } from '../components/ProductSlider/ProductSlider';
import { Loader } from '../components/Loader/Loader';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useSearchParams } from 'react-router-dom';

export const Phones = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(searchParams.get('sort') || 'age');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [perPage, setPerPage] = useState(searchParams.get('perPage') || 'all');

  useEffect(() => {
    const params = new URLSearchParams();

    if (sort !== 'age') {
      params.set('sort', sort);
    }

    if (currentPage !== 1) {
      params.set('page', String(currentPage));
    }

    if (perPage !== 'all') {
      params.set('perPage', perPage);
    }

    setSearchParams(params);
  }, [sort, currentPage, perPage, setSearchParams]);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        const newPhones = data.filter(product => product.category === 'phones');

        setPhones(newPhones);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);



  const sortedProducts = [...phones].sort((a, b) => {
    switch (sort) {
      case 'age':
        return b.year - a.year;

      case 'title':
        return a.name.localeCompare(b.name);

      case 'price':
        return a.price - b.price;

      default:
        return 0;
    }
  });

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productsToShow = sortedProducts.slice(start, end);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message="Product was not found" />;
  }

  if (!phones.length) {
    return <EmptyState productCategory="phones" />;
  }

  return (
    <div className={styles.pageGrid}>
      <div className={styles.phones__breadcrumbs}>
        <Breadcrumbs title={'phones'} />
      </div>

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.modelsCount}>{`${phones.length} models`}</p>

      <div className={styles.catalogControle}>
        <form>
          <label htmlFor="sort" className={styles.label}>
            Sort by
            <select
              id="sort"
              value={sort}
              className={styles.sortSelect}
              onChange={e => setSort(e.target.value)}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>
        </form>

        <form>
          <label htmlFor="perPage" className={styles.label}>
            Items on page
            <select
              id="perPage"
              value={perPage}
              className={styles.perPageSelect}
              onChange={e => {
                const value = e.target.value;

                setCurrentPage(1);
                if (value === 'all') {
                  setPerPage('all');
                } else {
                  setPerPage(value);
                }
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </label>
        </form>
      </div>

      <ProductList className={styles.products} products={productsToShow} />

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
