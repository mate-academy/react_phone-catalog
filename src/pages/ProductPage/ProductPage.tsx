import { useState, useEffect } from 'react';
import { useSearchParams, useParams, NavLink } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { ProductCart } from '../../components/ProductCart';
import jsonData from '../../../public/api/products.json';
import { CustomDropdown } from '../../components/CustomDropdown';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const ProductPage = () => {
  const { product } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageFromURL = searchParams.get('perPage') || 'all';
  const sortByFromURL = searchParams.get('sort') || 'age';
  const pageFromURL = Number(searchParams.get('page')) || 1;

  const [perPage, setPerPage] = useState<string>(perPageFromURL);
  const [sortBy, setSortBy] = useState(sortByFromURL);
  const [currentPage, setCurrentPage] = useState(pageFromURL);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (perPage !== 'all') {
      params.perPage = perPage.toString();
    }

    params.sort = sortBy;

    if (currentPage !== 1) {
      params.page = currentPage.toString();
    }

    setSearchParams(params);
  }, [perPage, sortBy, currentPage, setSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  const filteredProducts = jsonData.filter(item => item.category === product);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'age') {
      return b.year - a.year;
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'title') {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const xxxx = sortedProducts.slice(
    (currentPage - 1) * Number(perPage),
    currentPage * Number(perPage),
  );

  const displayedProducts = perPage === 'all' ? sortedProducts : xxxx;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <>
      {displayedProducts.length === 0 ? (
        <p>There are no {product} yet</p>
      ) : (
        <div className={styles.productPage}>
          <div className={styles.phones__top}>
            <BreadCrumbs></BreadCrumbs>
            <h1 className={styles.phones__title}>{product} page</h1>
            <p className={styles.phones__count}>
              {filteredProducts.length} models
            </p>
            <div className={styles.phones__sort}>
              <CustomDropdown
                options={[
                  { value: 'age', label: 'Newest' },
                  { value: 'title', label: 'Alphabetically' },
                  { value: 'price', label: 'Cheapest' },
                ]}
                selected={sortBy}
                onChange={setSortBy}
                string={'Sort by'}
              />

              <CustomDropdown
                options={[
                  { value: 'all', label: 'All' },
                  { value: '16', label: '16' },
                  { value: '32', label: '32' },
                  { value: '48', label: '48' },
                ]}
                selected={perPage}
                onChange={setPerPage}
                string={'Items on page'}
              />
            </div>
          </div>
          <div className={styles.productGrid}>
            {displayedProducts.map(item => (
              <ProductCart key={item.id} item={item} />
            ))}
          </div>

          {perPage !== 'all' && (
            <div className={styles.pagination}>
              <NavLink
                to={`?page=${currentPage - 1}&perPage=${perPage}&sort=${sortBy}`}
                className={`${styles.pagination__link} ${currentPage === 1 ? 'disabled' : ''}`}
                data-cy="prevLink"
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              >
                «
              </NavLink>

              {pages.map(page => (
                <NavLink
                  key={page}
                  to={`?page=${page}&perPage=${perPage}&sort=${sortBy}`}
                  className={`${styles.pagination__link} ${currentPage === page ? styles.activePage : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </NavLink>
              ))}

              <NavLink
                to={`?page=${currentPage + 1}&perPage=${perPage}&sort=${sortBy}`}
                className={`${styles.pagination__link} ${currentPage === totalPages ? 'disabled' : ''}`}
                data-cy="nextLink"
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
              >
                »
              </NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
};
