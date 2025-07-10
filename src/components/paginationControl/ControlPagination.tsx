import styles from './ControlPagination.module.scss';

import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentPage, setTotalPage } from '../../features/PaginationSlice';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Product } from '../../types/products';
type Props = {
  allGoods: Product[];
  perPages: string;
};

export const ControlPagination = ({ allGoods, perPages }: Props) => {
  const [searchParams, setSearhParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const sumPages = Math.ceil(allGoods.length / +perPages);

  const activePage = useAppSelector(state => state.pagination.currentPage);

  useEffect(() => {
    dispatch(setTotalPage(sumPages));
  }, [sumPages, dispatch]);

  const getVisiblePages = (
    totalPages: number,
    currentPage: number,
  ): number[] => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, 4];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <>
      {' '}
      <div className={styles.pagination}>
        <ul className={styles.pagination__flex}>
          <li
            className={classNames(styles.pagination__list, [
              styles['pagination__list--left'],
            ])}
          >
            <button
              className={classNames(styles.pagination__link, {
                [styles['pagination__link--disabled']]: activePage === 1,
              })}
              onClick={() => {
                dispatch(setCurrentPage(activePage - 1));
                const params = new URLSearchParams(searchParams);

                if (+activePage === 2) {
                  params.delete('page');
                } else {
                  params.set('page', (activePage - 1).toString());
                }

                setSearhParams(params);
              }}
            >
              <IoIosArrowBack />
            </button>
          </li>
          {getVisiblePages(sumPages, activePage).map(page => {
            return (
              <li className={styles.pagination__list} key={page}>
                <button
                  onClick={() => {
                    dispatch(setCurrentPage(page));
                    const params = new URLSearchParams(searchParams);

                    if (page === 1) {
                      params.delete('page');
                    } else {
                      params.set('page', page.toString());
                    }

                    setSearhParams(params);
                  }}
                  className={classNames(styles.pagination__link, {
                    [styles['pagination__link--active']]: page === activePage,
                  })}
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li
            className={classNames(styles.pagination__list, [
              styles['pagination__list--right'],
            ])}
          >
            <button
              className={classNames(styles.pagination__link, {
                [styles['pagination__link--disabled']]: activePage === sumPages,
              })}
              onClick={() => {
                dispatch(setCurrentPage(activePage + 1));
                const params = new URLSearchParams(searchParams);

                params.set('page', (activePage + 1).toString());
                setSearhParams(params);
              }}
              disabled={activePage === sumPages}
            >
              <IoIosArrowForward />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
