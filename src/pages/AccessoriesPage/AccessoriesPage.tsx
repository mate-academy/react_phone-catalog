/* eslint-disable @typescript-eslint/indent */
import styles from './AccessoriesPage.module.scss';
import { type Product } from '../../types';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import { Link, useSearchParams } from 'react-router-dom';
import { getYear } from '../../helpers/helpers';

export const AccessoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(
    Number(searchParams.get('perPage')) || 'all',
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [typePerPage, setTypePerPage] = useState(
    searchParams.get('sort') || 'age',
  );

  const sortedAccessories = useMemo(() => {
    const sorted = [...accessories];

    if (typePerPage === 'age') {
      sorted.sort((a, b) => getYear(b) - getYear(a));
    }

    if (typePerPage === 'title') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (typePerPage === 'price') {
      sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
    }

    return sorted;
  }, [accessories, typePerPage]);

  const totalPages =
    itemsPerPage === 'all'
      ? 1
      : Math.ceil(sortedAccessories.length / itemsPerPage);

  const visibleAccessories =
    itemsPerPage === 'all'
      ? sortedAccessories
      : sortedAccessories.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  useEffect(() => {
    fetch('api/accessories.json')
      .then(response => response.json())
      .then(data => {
        setAccessories(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </>
    );
  }

  if (accessories.length === 0) {
    return <p>There are no phones yet</p>;
  }

  const changePage = (page: number) => {
    setCurrentPage(page);

    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(page));
    }

    setSearchParams(newParams);
  };

  return (
    <>
      <Header />
      <div className={styles.accessories}>
        <div className={styles.accessories__header}>
          <Link to={'/'}>
            <img
              src="img/icons/home.svg"
              alt="Home icon"
              className={styles.accessories__homeIcon}
            />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.accessories__arrowIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <p className={styles.accessories__headerText}>Accessories</p>
        </div>
        <div className={styles.accessories__info}>
          <h1 className={styles.accessories__title}>Accessories</h1>
          <p className={styles.accessories__amount}>
            {accessories.length} models
          </p>
        </div>

        <div className={styles.accessories__controls}>
          <div className={styles.accessories__controlsItem}>
            <p className={styles.accessories__nameOption}>Sort by</p>
            <label className={styles.visuallyHidden} htmlFor="typePerPage">
              Sort by
            </label>
            <select
              id="typePerPage"
              value={typePerPage}
              className={`${styles.accessories__select} ${styles.accessories__selectTypePerPage}`}
              onChange={event => {
                const value = event.target.value;

                setTypePerPage(value);
                setCurrentPage(1);

                const newParams = new URLSearchParams(searchParams);

                newParams.set('sort', value);
                newParams.delete('page');

                setSearchParams(newParams);
              }}
            >
              <option value={'age'}>Newest</option>
              <option value={'title'}>Alphabetically</option>
              <option value={'price'}>Cheapest</option>
            </select>
          </div>
          <div className={styles.accessories__controlsItem}>
            <p className={styles.accessories__nameOption}>Items on page</p>
            <label className={styles.visuallyHidden} htmlFor="itemsPerPage">
              Items on page
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              className={styles.accessories__select}
              onChange={event => {
                const value = event.target.value;

                setItemsPerPage(value === 'all' ? 'all' : Number(value));
                setCurrentPage(1);

                const newParams = new URLSearchParams(searchParams);

                if (value === 'all') {
                  newParams.delete('perPage');
                } else {
                  newParams.set('perPage', value);
                  newParams.delete('page');
                }

                setSearchParams(newParams);
              }}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={'all'}>all</option>
            </select>
          </div>
        </div>

        <div className={styles.accessories__products}>
          <ProductList products={visibleAccessories} />
        </div>
        {totalPages > 1 && (
          <div className={styles.accessories__buttons}>
            <button
              className={styles.accessories__button}
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.accessories__icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div className={styles.accessories__pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={
                    currentPage === index + 1
                      ? styles['pagination__button--active']
                      : styles.pagination__button
                  }
                  key={index}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className={styles.accessories__button}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.accessories__icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
