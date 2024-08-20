import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { useMemo } from 'react';
import usePagination from '../hooks/usePagination';

export const Pagination = () => {
  const { createPageProducts } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const { search } = useLocation();

  const handlChangPage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', e.currentTarget.innerText);
    setSearchParams(params);
  };

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+page + 1).toString());
    setSearchParams(params);
  };

  const previousPege = () => {
    const params = new URLSearchParams(searchParams);

    params.set('page', (+page - 1).toString());
    setSearchParams(params);
  };

  const turnPagination = useMemo(() => {
    if (+page % 2 !== 0) {
      return 0;
    }

    if (+page >= createPageProducts.length - 1) {
      return;
    }

    return +page * 40 - 80;
  }, [page, createPageProducts, search]);

  const stateButtonLeft = +page === 1;
  const stateButtonRight = +page === createPageProducts.length;

  return (
    <div className={styles.pagination}>
      <button
        disabled={stateButtonLeft}
        className={classNames(`${styles.arrow} ${styles.arrow__left}`, {
          [styles.button__disablet]: stateButtonLeft,
        })}
        onClick={previousPege}
      ></button>
      <div className={styles.pagination__container}>
        <ul
          className={styles.nav}
          style={{ transform: `translateX(-${turnPagination}px)` }}
        >
          {createPageProducts.map((_, index) => (
            <li
              key={index}
              className={classNames(styles.nav__item, {
                [styles.is__active]: +page === index + 1,
              })}
              onClick={handlChangPage}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
      <button
        disabled={stateButtonRight}
        className={classNames(`${styles.arrow} ${styles.arrow__right}`, {
          [styles.button__disablet]: stateButtonRight,
        })}
        onClick={nextPage}
      ></button>
    </div>
  );
};
