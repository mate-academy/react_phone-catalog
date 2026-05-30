import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ProductPageStyles.module.scss';
import { Product } from '../../types/ProductTypes';
import { getProducts } from '../../api/api';
import { Loader } from '../../components/Loader/Loader';
import { ProductList } from '../../components/ProductList/ProductList';
import { CustomSelect } from '../../components/CustomSelect/CustomSelect';

type Props = {
  type: string;
  title: string;
};

const PAGE_WINDOW = 4;

export const ProductPage: React.FC<Props> = ({ type, title }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<boolean>(false);
  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam || 4);

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'age') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', value);
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', newPage.toString());
    }
    setSearchParams(newParams);
  };

  const handlePerPageChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.set('perPage', 'all');
    } else {
      newParams.set('perPage', value);
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'alphabetically') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'cheapest') {
      return a.price - b.price;
    } else {
      return b.year - a.year;
    }
  });

  const totalProducts = sortedProducts.length;
  let visibleProducts = sortedProducts;

  if (perPage !== 'all') {
    const start = (page - 1) * perPage;
    visibleProducts = sortedProducts.slice(start, start + perPage);
  }

  const totalPages = perPage === 'all' ? 1 : Math.ceil(totalProducts / perPage);
  const startPage = Math.max(1, page - Math.floor(PAGE_WINDOW / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_WINDOW - 1);
  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(products => {
        const filtered = products.filter(product => product.category === type);
        setFilteredProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [type]);

  return (
    <>
      {error && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>Something went wrong. Please try again.</p>
          <button onClick={() => window.location.reload()} className={styles.errorButton}>
            Reload
          </button>
        </div>
      )}
      {loading && <Loader />}
      {!loading && filteredProducts.length === 0 && <p>There are no products on the server</p>}
      {!loading && filteredProducts.length > 0 && (
        <div className={styles.pageSection}>
          <div className={styles.whereIAm}>
            <Link to="/" className={styles.homeImg}>
              <img src="/react_phone-catalog/img/icons/Home.svg" alt="home" />
            </Link>
            <div className={styles.phonesRight}>
              <p>&gt;</p>
            </div>
            <div className={styles.phonesText}>
              <p className={styles.phonesText}>{title}</p>
            </div>
          </div>
          <div className={styles.titlePage}>
            <div className={styles.productText}>
              <h1 className={styles.productText}>{title}</h1>
            </div>
            <p className={styles.howManyProducts}>{totalProducts} models</p>
          </div>
          <div className={styles.sortSection}>
            <div className={styles.sortingBy}>
              <p className={styles.sortText}>Sort by</p>
              <CustomSelect
                value={sort}
                onChange={handleSortChange}
                options={[
                  { value: 'age', label: 'Newest' },
                  { value: 'alphabetically', label: 'Alphabetically' },
                  { value: 'cheapest', label: 'Cheapest' },
                ]}
              />
            </div>
            <div className={styles.itemsOnPage}>
              <p className={styles.itemsOnPageText}>Items on page</p>
              <CustomSelect
                value={perPage.toString()}
                onChange={handlePerPageChange}
                options={[
                  { value: '4', label: '4' },
                  { value: '8', label: '8' },
                  { value: '16', label: '16' },
                  { value: 'all', label: 'All' },
                ]}
              />
            </div>
          </div>
          <div className={styles.productsList}>
            <ProductList products={visibleProducts} />
          </div>
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={styles.back_forwButtnons}
              >
                &lt;
              </button>
              {pages.map(p => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={page === p ? styles.activePage : styles.notActivePage}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={styles.back_forwButtnons}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
