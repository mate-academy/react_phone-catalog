import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/Products';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductsPage.module.scss';
import classname from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const category = location.pathname.slice(1);

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(allProducts => {
        const filteredProducts = allProducts.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
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
  }, [products, sort]);

  const totalItems = sortedProducts.length;
  let visibleProducts = sortedProducts;
  let totalPages = 1;

  if (perPage !== 'all') {
    const limit = Number(perPage);

    totalPages = Math.ceil(totalItems / limit);
    const start = (currentPage - 1) * limit;
    const end = start + limit;

    visibleProducts = sortedProducts.slice(start, end);
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', event.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.page}>
      <Breadcrumbs category={category} />
      {category === 'phones' && <h1 className={styles.title}>Mobile phones</h1>}
      {category === 'tablets' && <h1 className={styles.title}>Tablets</h1>}
      {category === 'accessories' && (
        <h1 className={styles.title}>Accessories</h1>
      )}
      <p className={styles.count}>{products.length} models</p>

      {!isLoading && !isError && products.length > 0 && (
        <div className={styles.controls}>
          <div className={styles.controlBlock}>
            {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
            <label className={styles.label}>Sort by</label>
            <select
              className={styles.select}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>

          <div className={styles.controlBlock}>
            {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
            <label className={styles.label}>Items on page</label>
            <select
              className={styles.select}
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="all">All</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && !isError && (
        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && !isError && perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageArrow}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <img src="/img/icons/ArrowLeft.png" alt="Back" />
          </button>

          {pages.map(page => (
            <button
              key={page}
              className={classname(styles.pageButton, {
                [styles.active]: page === currentPage,
              })}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.pageArrow}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <img src="/img/icons/ArrowRight.png" alt="Back" />
          </button>
        </div>
      )}

      {products.length === 0 && !isLoading && !isError && (
        <h2>There are no {category} yet </h2>
      )}
    </div>
  );
};
