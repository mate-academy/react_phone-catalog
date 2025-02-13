import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateSearchParam } from '../../utils/searchHelper';
import styles from './Pagination.module.scss';

interface Props {
  searchParams: URLSearchParams;
  total: number;
  prePage: number;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  searchParams,
  total,
  prePage,
  currentPage,
}) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(total / prePage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (totalPages < currentPage) {
      navigate(updateSearchParam('page', '1', '1', searchParams));
    }
  }, [totalPages, currentPage, navigate, searchParams]);

  const handleClickLeft = () => {
    const page = currentPage - 1 === 0 ? 1 : currentPage - 1;

    return updateSearchParam('page', page.toString(), '1', searchParams);
  };

  const handleClickRight = () => {
    const page =
      currentPage + 1 === totalPages + 1 ? totalPages : currentPage + 1;

    return updateSearchParam('page', page.toString(), '1', searchParams);
  };

  return (
    <ul
      className={classNames(styles.pagination__list, {
        [styles['pagination__list--transfer']]: totalPages >= 16,
      })}
    >
      <li className={classNames(styles.pagination__item)}>
        <Link
          className={classNames(
            styles.button,
            styles.button__slider,
            styles['button__slider--left'],
          )}
          to={handleClickLeft()}
        ></Link>
      </li>
      {pages.map(page => (
        <li key={page} className={classNames(styles.pagination__item)}>
          <Link
            className={classNames(styles.button, styles.button__page, {
              [styles['button__page--selected']]: currentPage === page,
            })}
            to={updateSearchParam('page', page.toString(), '1', searchParams)}
          >
            {page}
          </Link>
        </li>
      ))}
      <li className={classNames(styles.pagination__item)}>
        <Link
          className={classNames(
            styles.button,
            styles.button__slider,
            styles['button__slider--right'],
          )}
          to={handleClickRight()}
        ></Link>
      </li>
    </ul>
  );
};
