import React from 'react';
import classNames from 'classnames';
import styles from './CatalogPagination.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../shared/utils/SearchUtils';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

export const PaginationItems: React.FC<Props> = ({
  totalPages,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const windowSize = 4;
  const start = Math.max(0, Math.min(currentPage - 2, totalPages - windowSize));
  const end = Math.min(totalPages, start + windowSize);

  const prevLink =
    currentPage === 1
      ? { search: getSearchWith(searchParams, { page: null }).toString() }
      : {
          search: getSearchWith(searchParams, {
            page: String(currentPage - 1),
          }).toString(),
        };

  const nextLink =
    currentPage === totalPages
      ? {
          search: getSearchWith(searchParams, {
            page: String(currentPage),
          }).toString(),
        }
      : {
          search: getSearchWith(searchParams, {
            page: String(currentPage + 1),
          }).toString(),
        };

  return (
    <ul className={styles.pagination}>
      <li
        className={classNames(
          styles['pagination__item-btn'],
          styles['pagination__item-btn--prev'],
        )}
      >
        <Link
          className={styles['pagination__link-arrows']}
          to={prevLink}
          onClick={e => {
            if (currentPage === 1) {
              e.preventDefault();
            }
          }}
        >
          <img
            className={styles.arrowBlack}
            src="./img/icons/left_black_arrow.svg"
            alt="Arrow left"
          />
          <img
            className={styles.arrowWhite}
            src="./img/icons/left_white_arrow.png"
            alt="Arrow left"
          />
        </Link>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(start, end)
        .map(elem => (
          <li
            className={classNames(styles.pagination__item, {
              [styles['pagination__item--active']]: elem === currentPage,
            })}
            key={elem}
          >
            <Link
              className={styles.pagination__link}
              to={{
                search: getSearchWith(searchParams, {
                  page: elem === 1 ? null : elem.toString(),
                }).toString(),
              }}
            >
              {elem}
            </Link>
          </li>
        ))}
      <li
        className={classNames(
          styles['pagination__item-btn'],
          styles['pagination__item-btn--next'],
        )}
      >
        <Link
          className={styles['pagination__link-arrows']}
          to={nextLink}
          onClick={e => {
            if (currentPage === totalPages) {
              e.preventDefault();
            }
          }}
        >
          <img
            className={styles.arrowBlack}
            src="./img/icons/right_black_arrow.svg"
            alt="Arrow right"
          />
          <img
            className={styles.arrowWhite}
            src="./img/icons/right_white_arrow.svg"
            alt="Arrow right"
          />
        </Link>
      </li>
    </ul>
  );
};
